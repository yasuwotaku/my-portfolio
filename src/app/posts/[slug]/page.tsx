import { Container } from "@/components/layout/container";
import { PostBody } from "@/components/post/post-body";
import { PostHeader } from "@/components/post/post-header";
import { markdownToHtml } from "@/lib/markdown";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { SITE_NAME } from "@/lib/site";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export default async function Post(props: Params) {
	const params = await props.params;
	const post = getPostBySlug(params.slug);

	if (!post) {
		return notFound();
	}

	const content = await markdownToHtml(post.content || "");

	return (
		<main>
			<Container>
				<article className="mb-32">
					<PostHeader
						title={post.title}
						coverImage={post.coverImage}
						date={post.date}
						category={post.category}
						topics={post.topics}
						draft={post.draft}
					/>
					<PostBody content={content} />
				</article>
			</Container>
		</main>
	);
}

type Params = {
	params: Promise<{
		slug: string;
	}>;
};

export async function generateMetadata(props: Params): Promise<Metadata> {
	const params = await props.params;
	const post = getPostBySlug(params.slug);

	if (!post) {
		return notFound();
	}

	const title = `${post.title} | ${SITE_NAME}`;

	const url = `/posts/${post.slug}`;

	return {
		title,
		description: post.excerpt,
		alternates: {
			canonical: url,
		},
		openGraph: {
			title,
			description: post.excerpt,
			type: "article",
			url,
			images: [post.ogImage.url],
		},
		twitter: {
			card: "summary_large_image",
			title,
			description: post.excerpt,
			images: [post.ogImage.url],
		},
	};
}

export async function generateStaticParams() {
	const posts = getAllPosts();

	return posts.map((post) => ({
		slug: post.slug,
	}));
}
