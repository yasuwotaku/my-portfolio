import { z } from "zod";

export const CATEGORY_NAMES = ["Blog", "Zenn", "Qiita"] as const;
export type Category = (typeof CATEGORY_NAMES)[number];

export type Topic = {
	slug: string;
	label: string;
};

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
	topics: z.array(z.string()).default([]),
	draft: z.boolean().default(false),
	featured: z.boolean().default(false),
});

export type PostFrontmatter = z.infer<typeof postFrontmatterSchema>;

export type Post = Omit<PostFrontmatter, "topics"> & {
	category: "Blog";
	slug: string;
	content: string;
	topics: Topic[];
};

export type BlogPostItem = { kind: "post" } & Pick<
	Post,
	"slug" | "title" | "date" | "coverImage" | "category" | "topics" | "draft"
>;

export type RawExternalTopic = {
	slug?: string;
	label: string;
};

export const rawExternalPostItemSchema = z.object({
	kind: z.literal("external"),
	source: z.enum(["zenn", "qiita"]),
	url: z.url(),
	title: z.string(),
	date: z.iso.datetime({ local: true }),
	category: z.enum(["Zenn", "Qiita"]),
	rawTopics: z.array(
		z.object({
			slug: z.string().optional(),
			label: z.string(),
		})
	),
});

export type RawExternalPostItem = z.infer<typeof rawExternalPostItemSchema>;

export const externalPostItemSchema = z.object({
	kind: z.literal("external"),
	source: z.enum(["zenn", "qiita"]),
	url: z.url(),
	title: z.string(),
	date: z.iso.datetime({ local: true }),
	category: z.enum(["Zenn", "Qiita"]),
	topics: z.array(
		z.object({
			slug: z.string(),
			label: z.string(),
		})
	),
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
	name: z.string(),
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
