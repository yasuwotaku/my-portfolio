import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import { TagHeader } from "@/app/_components/tag-header";
import { MoreStories } from "@/app/_components/more-stories";
import { getAllTags, getPostsByTag } from "@/lib/api";

export default async function Post(props: Params) {
	const params = await props.params;
	const posts = getPostsByTag(params.tag);

	return (
		<main>
			<Container>
				<Header />
				<TagHeader tag={params.tag} />
				{posts.length > 0 && <MoreStories posts={posts} />}
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
