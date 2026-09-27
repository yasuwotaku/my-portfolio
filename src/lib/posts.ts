import { getExternalPosts } from "@/lib/external-posts";
import {
	BlogPostItem,
	FeedItem,
	Post,
	postFrontmatterSchema,
} from "@/types/post";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const postsDirectory = join(process.cwd(), "_posts");

let cachedPosts: Post[] | null = null;

function loadAllPosts(): Post[] {
	if (cachedPosts) {
		return cachedPosts;
	}

	const fileNames = fs
		.readdirSync(postsDirectory)
		.filter((file) => file.endsWith(".md"));

	const posts = fileNames.map((fileName) => {
		const fullPath = join(postsDirectory, fileName);
		const fileContents = fs.readFileSync(fullPath, "utf8");
		const { data, content } = matter(fileContents);
		const result = postFrontmatterSchema.safeParse(data);

		if (!result.success) {
			throw new Error(
				`Failed to validate front matter in "${fileName}": ${result.error.message}`
			);
		}

		const slug = fileName.replace(/\.md$/, "");
		return {
			...result.data,
			slug,
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

export function getPostsByTag(tag: string): Post[] {
	return getAllPosts().filter((post) => post.tags.includes(tag));
}

export async function getFeedItems(): Promise<FeedItem[]> {
	const blogPosts = getAllPosts().map(
		(post): BlogPostItem => ({
			kind: "post",
			slug: post.slug,
			title: post.title,
			date: post.date,
			coverImage: post.coverImage,
			tags: post.tags,
		})
	);

	const externalPosts = await getExternalPosts();
	const feedItems: FeedItem[] = [...blogPosts, ...externalPosts];

	// sort all items by date in descending order
	feedItems.sort((a, b) => (a.date > b.date ? -1 : 1));

	return feedItems;
}

export async function getFeedItemsByTag(tag: string): Promise<FeedItem[]> {
	const feedItems = await getFeedItems();
	return feedItems.filter((item) => item.tags.includes(tag));
}

export async function getTagCounts(): Promise<{ tag: string; count: number }[]> {
	const tagCountMap = new Map<string, number>();
	const feedItems = await getFeedItems();
	for (const item of feedItems) {
		for (const tag of item.tags) {
			tagCountMap.set(tag, (tagCountMap.get(tag) ?? 0) + 1);
		}
	}

	return Array.from(tagCountMap.entries())
		.map(([tag, count]) => ({ tag, count }))
		.sort((a, b) => a.tag.localeCompare(b.tag));
}

export async function getAllTags(): Promise<string[]> {
	const tagCounts = await getTagCounts();
	return tagCounts.map((item) => item.tag);
}
