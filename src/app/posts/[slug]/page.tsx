import { Container } from "@/components/layout/container";
import { PostBody } from "@/components/post/post-body";
import { PostHeader } from "@/components/post/post-header";
import { markdownToHtml } from "@/lib/markdown";
import { DEFAULT_OPEN_GRAPH, DEFAULT_TWITTER } from "@/lib/metadata";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { PROFILE } from "@/lib/profile";
import { SITE_URL } from "@/lib/site";
import { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export default async function Post(props: Params) {
	const params = await props.params;
	const post = getPostBySlug(params.slug);

	if (!post) {
		return notFound();
	}

	const content = await markdownToHtml(post.content || "");

	const fallbackDescription = post.content
		? post.content
				.replace(/```[\s\S]*?```/g, "")
				.replace(/<[^>]+>/g, "")
				.replace(/!?\[([^\]]*)\]\([^)]+\)/g, "$1")
				.replace(/[#*`_~>\-+|]/g, "")
				.replace(/\s+/g, " ")
				.trim()
				.slice(0, 120) + "…"
		: "";
	const description = post.excerpt || fallbackDescription;

	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		headline: post.title,
		description,
		image: [`${SITE_URL}${post.ogImage.url}`],
		datePublished: new Date(post.date).toISOString(),
		author: [
			{
				"@type": "Person",
				name: PROFILE.name,
				url: SITE_URL,
			},
		],
	};

	return (
		<main>
			<Script src="https://embed.zenn.studio/js/listen-embed-event.js" />
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
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

	const title = post.title;

	const url = `/posts/${post.slug}`;

	const fallbackDescription = post.content
		? post.content
				.replace(/```[\s\S]*?```/g, "")
				.replace(/<[^>]+>/g, "")
				.replace(/!?\[([^\]]*)\]\([^)]+\)/g, "$1")
				.replace(/[#*`_~>\-+|]/g, "")
				.replace(/\s+/g, " ")
				.trim()
				.slice(0, 120) + "…"
		: "";
	const description = post.excerpt || fallbackDescription;

	return {
		title,
		description,
		alternates: {
			canonical: url,
		},
		openGraph: {
			...DEFAULT_OPEN_GRAPH,
			title,
			description,
			type: "article",
			url,
			images: [post.ogImage.url],
		},
		twitter: {
			...DEFAULT_TWITTER,
			title,
			description,
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
