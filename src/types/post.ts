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
