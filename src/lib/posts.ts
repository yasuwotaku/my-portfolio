import { getExternalPosts } from "@/lib/external-posts";
import {
	CATEGORY_SLUGS,
	CategorySlug,
	categoryToSlug,
	isCategorySlug,
	topicToSlug,
} from "@/lib/topics";
import {
	BlogPostItem,
	ExternalPostItem,
	FeedItem,
	Post,
	postFrontmatterSchema,
	RawExternalPostItem,
	Topic,
} from "@/types/post";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const postsDirectory = join(process.cwd(), "_posts");

let cachedPosts: Post[] | null = null;

// 同じ slug のトピックは最初に出てきた表記に揃える。
// ブログ記事を外部記事より先に処理するので、ブログ記事の表記が優先される。
const topicLabels = new Map<string, string>();

function resolveTopics(rawTopics: { slug?: string; label: string }[]): Topic[] {
	const topics: Topic[] = [];
	for (const { slug: rawSlug, label: rawLabel } of rawTopics) {
		// 表示をコンパクトにし、空白の有無による表記ゆれを吸収する
		const label = rawLabel.replace(/\s+/g, "");
		const slug = topicToSlug(rawSlug ?? label);
		if (!slug || isCategorySlug(slug) || topics.some((t) => t.slug === slug)) {
			continue;
		}
		if (!topicLabels.has(slug)) {
			topicLabels.set(slug, label);
		}
		topics.push({ slug, label: topicLabels.get(slug) ?? label });
	}
	return topics;
}

function loadAllPosts(): Post[] {
	if (cachedPosts) {
		return cachedPosts;
	}

	const fileNames = fs
		.readdirSync(postsDirectory)
		.filter((file) => file.endsWith(".md"));

	const posts: Post[] = fileNames.map((fileName) => {
		const fullPath = join(postsDirectory, fileName);
		const fileContents = fs.readFileSync(fullPath, "utf8");
		const { data, content } = matter(fileContents);
		const result = postFrontmatterSchema.safeParse(data);

		if (!result.success) {
			throw new Error(
				`Failed to validate front matter in "${fileName}": ${result.error.message}`
			);
		}

		return {
			...result.data,
			category: "Blog",
			topics: resolveTopics(result.data.topics.map((label) => ({ label }))),
			slug: fileName.replace(/\.md$/, ""),
			content,
		};
	});

	// sort posts by date in descending order
	posts.sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

	cachedPosts = posts;
	return cachedPosts;
}

export function getAllPosts(): Post[] {
	return loadAllPosts();
}

export function getPostBySlug(slug: string): Post | undefined {
	const realSlug = slug.replace(/\.md$/, "");
	return getAllPosts().find((post) => post.slug === realSlug);
}

let feedItemsPromise: Promise<FeedItem[]> | null = null;

async function fetchAndNormalizeFeedItems(): Promise<FeedItem[]> {
	const posts = getAllPosts();
	const blogPosts: BlogPostItem[] = posts.map(
		(post): BlogPostItem => ({
			kind: "post",
			slug: post.slug,
			title: post.title,
			date: post.date,
			coverImage: post.coverImage,
			category: post.category,
			topics: post.topics,
		})
	);

	const rawExternalPosts: RawExternalPostItem[] = await getExternalPosts();

	const normalizedExternalPosts: ExternalPostItem[] = rawExternalPosts.map(
		(item) => ({
			kind: "external",
			source: item.source,
			url: item.url,
			title: item.title,
			date: item.date,
			category: item.category,
			topics: resolveTopics(item.rawTopics),
		})
	);

	const feedItems: FeedItem[] = [...blogPosts, ...normalizedExternalPosts];

	// sort all items by date in descending order
	feedItems.sort((a, b) => (a.date > b.date ? -1 : 1));

	return feedItems;
}

export function getFeedItems(): Promise<FeedItem[]> {
	if (!feedItemsPromise) {
		feedItemsPromise = fetchAndNormalizeFeedItems();
	}
	return feedItemsPromise;
}

export async function getAllTopics(): Promise<Topic[]> {
	const feedItems = await getFeedItems();
	const topicMap = new Map<string, Topic>();

	for (const item of feedItems) {
		for (const topic of item.topics) {
			if (!topicMap.has(topic.slug)) {
				topicMap.set(topic.slug, topic);
			}
		}
	}

	return Array.from(topicMap.values()).sort((a, b) =>
		a.label.localeCompare(b.label)
	);
}


export async function getCategoryTopicSlugs(): Promise<
	Record<CategorySlug, string[]>
> {
	const feedItems = await getFeedItems();
	const entries = CATEGORY_SLUGS.map((category) => {
		const slugs = feedItems
			.filter((item) => categoryToSlug(item.category) === category)
			.flatMap((item) => item.topics.map((topic) => topic.slug));
		return [category, [...new Set(slugs)]] as const;
	});
	return Object.fromEntries(entries) as Record<CategorySlug, string[]>;
}

