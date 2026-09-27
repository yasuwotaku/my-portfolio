import { Post, postFrontmatterSchema } from "@/types/post";
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

export function getTagCounts(): { tag: string; count: number }[] {
	const tagCountMap = new Map<string, number>();
	for (const post of getAllPosts()) {
		for (const tag of post.tags) {
			tagCountMap.set(tag, (tagCountMap.get(tag) ?? 0) + 1);
		}
	}

	return Array.from(tagCountMap.entries())
		.map(([tag, count]) => ({ tag, count }))
		.sort((a, b) => a.tag.localeCompare(b.tag));
}

export function getAllTags(): string[] {
	return getTagCounts().map((item) => item.tag);
}
