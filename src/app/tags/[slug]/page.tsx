import { Container } from "@/components/layout/container";
import { Posts } from "@/components/post/posts";
import { TagList } from "@/components/tag/tag-list";
import { getAllTopics, getFeedItemsBySlug, getTopicBySlug } from "@/lib/posts";
import { SITE_NAME } from "@/lib/site";
import { CATEGORY_SLUGS, isCategorySlug, slugToCategory } from "@/lib/topics";
import type { Metadata } from "next";

export const dynamicParams = false;

type Params = {
	params: Promise<{
		slug: string;
	}>;
};

export async function generateMetadata(props: Params): Promise<Metadata> {
	const params = await props.params;
	if (isCategorySlug(params.slug)) {
		const category = slugToCategory(params.slug);
		return {
			title: `${category} | ${SITE_NAME}`,
		};
	}

	const topic = await getTopicBySlug(params.slug);
	if (topic) {
		return {
			title: `#${topic.label} | ${SITE_NAME}`,
		};
	}

	return {
		title: `${params.slug} | ${SITE_NAME}`,
	};
}

export default async function TaggedPosts(props: Params) {
	const params = await props.params;
	const topics = await getAllTopics();
	const posts = await getFeedItemsBySlug(params.slug);

	return (
		<main>
			<Container>
				<TagList topics={topics} currentSlug={params.slug} />
				{posts.length > 0 && <Posts posts={posts} />}
			</Container>
		</main>
	);
}

export async function generateStaticParams() {
	const topics = await getAllTopics();
	const categoryParams = CATEGORY_SLUGS.map((slug) => ({ slug }));
	const topicParams = topics.map((topic) => ({ slug: topic.slug }));

	return [...categoryParams, ...topicParams];
}
