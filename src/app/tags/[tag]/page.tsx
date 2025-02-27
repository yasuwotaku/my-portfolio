import Container from "@/app/_components/container";
import { TagHeader } from "@/app/_components/tag-header";
import { Posts } from "@/app/_components/posts";
import { getAllTags, getPostsByTag } from "@/lib/api";

export default async function Post(props: Params) {
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
