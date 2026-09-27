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
	image: z.string().optional(),
	tags: z.array(z.string()),
});

export type ExternalPostItem = z.infer<typeof externalPostItemSchema>;

export type FeedItem = BlogPostItem | ExternalPostItem;

export const zennRssItemSchema = z.object({
	title: z.string(),
	link: z.string(),
	pubDate: z.string(),
	enclosure: z
		.object({
			url: z.string().optional(),
		})
		.optional(),
});

export const zennRssSchema = z.object({
	rss: z.object({
		channel: z.object({
			item: z.array(zennRssItemSchema).optional(),
		}),
	}),
});

export const qiitaItemSchema = z.object({
	title: z.string(),
	url: z.string(),
	created_at: z.string(),
});

export const qiitaResponseSchema = z.array(qiitaItemSchema);
