import { Container } from "@/components/layout/container";
import { Posts } from "@/components/post/posts";
import { PostsExplorer } from "@/components/post/posts-explorer";
import { TagList } from "@/components/tag/tag-list";
import { DEFAULT_OPEN_GRAPH } from "@/lib/metadata";
import { getAllTopics, getCategoryTopicSlugs, getFeedItems } from "@/lib/posts";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: "Posts",
	description: "yasuworks.comのブログ記事や外部メディアの投稿一覧です。",
	alternates: {
		canonical: "/posts",
	},
	openGraph: {
		...DEFAULT_OPEN_GRAPH,
		url: "/posts",
	},
};

export default async function PostsPage() {
	const [posts, topics, categoryTopicSlugs] = await Promise.all([
		getFeedItems(),
		getAllTopics(),
		getCategoryTopicSlugs(),
	]);

	return (
		<main>
			<h1 className="sr-only">記事一覧</h1>
			<Container>
				<Suspense
					fallback={
						<div data-posts-fallback>
							<TagList topics={topics} categoryTopicSlugs={categoryTopicSlugs} />
							{posts.length > 0 && <Posts posts={posts} />}
						</div>
					}
				>
					<PostsExplorer
						posts={posts}
						topics={topics}
						categoryTopicSlugs={categoryTopicSlugs}
					/>
				</Suspense>
			</Container>
		</main>
	);
}
