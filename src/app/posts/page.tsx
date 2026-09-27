import { Container } from "@/components/layout/container";
import { Posts } from "@/components/post/posts";
import { PostsExplorer } from "@/components/post/posts-explorer";
import { TagList } from "@/components/tag/tag-list";
import { getAllTopics, getCategoryTopicSlugs, getFeedItems } from "@/lib/posts";
import { SITE_NAME } from "@/lib/site";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: `Posts | ${SITE_NAME}`,
};

export default async function PostsPage() {
	const [posts, topics, categoryTopicSlugs] = await Promise.all([
		getFeedItems(),
		getAllTopics(),
		getCategoryTopicSlugs(),
	]);

	return (
		<main>
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
