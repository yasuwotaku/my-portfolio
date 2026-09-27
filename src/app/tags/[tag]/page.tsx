import { Container } from "@/components/layout/container";
import { Posts } from "@/components/post/posts";
import { TagList } from "@/components/tag/tag-list";
import { getAllTags, getFeedItemsByTag } from "@/lib/posts";
import { SITE_NAME } from "@/lib/site";
import type { Metadata } from "next";

export const dynamicParams = false;

type Params = {
	params: Promise<{
		tag: string;
	}>;
};

export async function generateMetadata(props: Params): Promise<Metadata> {
	const params = await props.params;
	return {
		title: `#${params.tag} | ${SITE_NAME}`,
	};
}

export default async function TaggedPosts(props: Params) {
	const params = await props.params;
	const tags = await getAllTags();
	const posts = await getFeedItemsByTag(params.tag);

	return (
		<main>
			<Container>
				<TagList tags={tags} current={params.tag} />
				{posts.length > 0 && <Posts posts={posts} />}
			</Container>
		</main>
	);
}

export async function generateStaticParams() {
	const tags = await getAllTags();

	return tags.map((tag) => ({
		tag: tag,
	}));
}
