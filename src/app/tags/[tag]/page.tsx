import { Container } from "@/components/layout/container";
import { Posts } from "@/components/post/posts";
import { TagHeader } from "@/components/tag/tag-header";
import { getAllTags, getPostsByTag } from "@/lib/posts";

export const dynamicParams = false;

export default async function TaggedPosts(props: Params) {
	const params = await props.params;
	const posts = getPostsByTag(params.tag);

	return (
		<main>
			<Container>
				<TagHeader tag={params.tag} />
				{posts.length > 0 && <Posts posts={posts} />}
			</Container>
		</main>
	);
}

type Params = {
	params: Promise<{
		tag: string;
	}>;
};

export async function generateStaticParams() {
	const tags = getAllTags();

	return tags.map((tag) => ({
		tag: tag,
	}));
}
