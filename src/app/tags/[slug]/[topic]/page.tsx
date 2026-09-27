import { Container } from "@/components/layout/container";
import { Posts } from "@/components/post/posts";
import { TagList } from "@/components/tag/tag-list";
import {
	getAllTopics,
	getCategoryTopicSlugs,
	getFeedItemsByCategoryAndTopic,
	getTopicBySlug,
} from "@/lib/posts";
import { SITE_NAME } from "@/lib/site";
import { isCategorySlug, slugToCategory } from "@/lib/topics";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamicParams = false;

type Params = {
	params: Promise<{
		slug: string;
		topic: string;
	}>;
};

export async function generateMetadata(props: Params): Promise<Metadata> {
	const params = await props.params;
	const category = isCategorySlug(params.slug)
		? slugToCategory(params.slug)
		: undefined;
	const topic = await getTopicBySlug(params.topic);

	const categoryName = category ?? params.slug;
	const topicLabel = topic ? topic.label : params.topic;

	return {
		title: `${categoryName} #${topicLabel} | ${SITE_NAME}`,
	};
}

export default async function TaggedCategoryTopicPosts(props: Params) {
	const params = await props.params;
	if (!isCategorySlug(params.slug)) {
		notFound();
	}

	const [topics, posts, categoryTopicSlugs] = await Promise.all([
		getAllTopics(),
		getFeedItemsByCategoryAndTopic(params.slug, params.topic),
		getCategoryTopicSlugs(),
	]);

	return (
		<main>
			<Container>
				<TagList
					topics={topics}
					categoryTopicSlugs={categoryTopicSlugs}
					currentCategory={params.slug}
					currentTopic={params.topic}
				/>
				{posts.length > 0 && <Posts posts={posts} />}
			</Container>
		</main>
	);
}

export async function generateStaticParams() {
	const categoryTopicSlugs = await getCategoryTopicSlugs();
	return Object.entries(categoryTopicSlugs).flatMap(([slug, topics]) =>
		topics.map((topic) => ({ slug, topic }))
	);
}
