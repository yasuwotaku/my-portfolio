import { Container } from "@/components/layout/container";
import { Posts } from "@/components/post/posts";
import { TagList } from "@/components/tag/tag-list";
import { getAllTopics, getFeedItems } from "@/lib/posts";
import { SITE_NAME } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: `Tags | ${SITE_NAME}`,
};

export default async function Index() {
	const topics = await getAllTopics();
	const posts = await getFeedItems();

	return (
		<main>
			<Container>
				<TagList topics={topics} />
				{posts.length > 0 && <Posts posts={posts} />}
			</Container>
		</main>
	);
}
