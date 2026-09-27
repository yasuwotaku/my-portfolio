import { Category } from "@/types/post";

export const CATEGORY_NAMES: readonly Category[] = [
	"Blog",
	"Zenn",
	"Qiita",
] as const;

export const CATEGORY_SLUGS = ["blog", "zenn", "qiita"] as const;
export type CategorySlug = (typeof CATEGORY_SLUGS)[number];

export function isCategorySlug(slug: string): slug is CategorySlug {
	return (CATEGORY_SLUGS as readonly string[]).includes(slug);
}

export function categoryToSlug(category: Category): CategorySlug {
	return category.toLowerCase() as CategorySlug;
}

export function slugToCategory(slug: string): Category | undefined {
	return CATEGORY_NAMES.find((c) => c.toLowerCase() === slug.toLowerCase());
}

/**
 * トピックの slug を生成する
 * 小文字化し、# → sharp、+ → plus、それ以外の英数字以外の文字（空白・.・- など）は削除
 */
export function topicToSlug(label: string): string {
	return label
		.toLowerCase()
		.replace(/#/g, "sharp")
		.replace(/\+/g, "plus")
		.replace(/[^a-z0-9]/g, "");
}

export function postsPath(category?: CategorySlug, topic?: string): string {
	const params = new URLSearchParams();
	if (category) {
		params.set("category", category);
	}
	if (topic) {
		params.set("topic", topic);
	}
	const queryString = params.toString();
	return queryString ? `/posts?${queryString}` : "/posts";
}
