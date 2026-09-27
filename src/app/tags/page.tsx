import { Container } from "@/components/layout/container";
import { Posts } from "@/components/post/posts";
import { TagList } from "@/components/tag/tag-list";
import { getAllTags, getFeedItems } from "@/lib/posts";
import { SITE_NAME } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: `Tags | ${SITE_NAME}`,
};

export default async function Index() {
	const tags = await getAllTags();
	const posts = await getFeedItems();

	return (
		<main>
			<Container>
				<TagList tags={tags} />
				{posts.length > 0 && <Posts posts={posts} />}
			</Container>
		</main>
	);
}
