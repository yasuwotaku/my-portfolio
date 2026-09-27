import { Container } from "@/components/layout/container";
import { Posts } from "@/components/post/posts";
import { TagList } from "@/components/tag/tag-list";
import {
	getAllTopics,
	getCategoryTopicSlugs,
	getFeedItemsBySlug,
	getTopicBySlug,
} from "@/lib/posts";
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
	const currentCategory = isCategorySlug(params.slug)
		? params.slug
		: undefined;
	const currentTopic = currentCategory ? undefined : params.slug;

	const [topics, posts, categoryTopicSlugs] = await Promise.all([
		getAllTopics(),
		getFeedItemsBySlug(params.slug),
		getCategoryTopicSlugs(),
	]);

	return (
		<main>
			<Container>
				<TagList
					topics={topics}
					categoryTopicSlugs={categoryTopicSlugs}
					currentCategory={currentCategory}
					currentTopic={currentTopic}
				/>
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
