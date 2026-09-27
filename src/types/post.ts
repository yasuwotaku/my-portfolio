import { z } from "zod";

export const postFrontmatterSchema = z.object({
	title: z.string(),
	excerpt: z.string(),
	coverImage: z.object({
		url: z.string(),
		alt: z.string(),
	}),
	date: z.iso.datetime({ local: true }),
	ogImage: z.object({
		url: z.string(),
	}),
	tags: z.array(z.string()),
});

export type PostFrontmatter = z.infer<typeof postFrontmatterSchema>;

export type Post = PostFrontmatter & {
	slug: string;
	content: string;
};

export type BlogPostItem = { kind: "post" } & Pick<
	Post,
	"slug" | "title" | "date" | "coverImage" | "tags"
>;

export const externalPostItemSchema = z.object({
	kind: z.literal("external"),
	source: z.enum(["zenn", "qiita"]),
	url: z.url(),
	title: z.string(),
	date: z.iso.datetime({ local: true }),
	tags: z.array(z.string()),
});

export type ExternalPostItem = z.infer<typeof externalPostItemSchema>;

export type FeedItem = BlogPostItem | ExternalPostItem;

export const zennArticleItemSchema = z.object({
	title: z.string(),
	path: z.string(),
	published_at: z.string(),
	slug: z.string(),
});

export const zennArticlesResponseSchema = z.object({
	articles: z.array(zennArticleItemSchema),
});

export const zennTopicSchema = z.object({
	display_name: z.string(),
});

export const zennArticleDetailSchema = z.object({
	article: z.object({
		topics: z.array(zennTopicSchema).default([]),
	}),
});

export const qiitaTagSchema = z.object({
	name: z.string(),
});

export const qiitaItemSchema = z.object({
	title: z.string(),
	url: z.string(),
	created_at: z.string(),
	tags: z.array(qiitaTagSchema).default([]),
});

export const qiitaResponseSchema = z.array(qiitaItemSchema);
