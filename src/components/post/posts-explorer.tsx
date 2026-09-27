"use client";

import { Posts } from "@/components/post/posts";
import { TagList } from "@/components/tag/tag-list";
import { CategorySlug, categoryToSlug, isCategorySlug } from "@/lib/topics";
import { FeedItem, Topic } from "@/types/post";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";

type Props = {
	posts: FeedItem[];
	topics: Topic[];
	categoryTopicSlugs: Record<CategorySlug, string[]>;
};

export function PostsExplorer({ posts, topics, categoryTopicSlugs }: Props) {
	const searchParams = useSearchParams();

	useEffect(() => {
		document.documentElement.classList.remove("has-filter");
	}, []);

	const rawCategory = searchParams.get("category");
	const rawTopic = searchParams.get("topic");

	const currentCategory: CategorySlug | undefined =
		rawCategory && isCategorySlug(rawCategory) ? rawCategory : undefined;

	let currentTopic: string | undefined =
		rawTopic && topics.some((t) => t.slug === rawTopic) ? rawTopic : undefined;

	if (currentCategory && currentTopic) {
		const availableTopics = categoryTopicSlugs[currentCategory] ?? [];
		if (!availableTopics.includes(currentTopic)) {
			currentTopic = undefined;
		}
	}

	const filteredPosts = useMemo(() => {
		return posts.filter((item) => {
			if (currentCategory && categoryToSlug(item.category) !== currentCategory) {
				return false;
			}
			if (currentTopic && !item.topics.some((t) => t.slug === currentTopic)) {
				return false;
			}
			return true;
		});
	}, [posts, currentCategory, currentTopic]);

	return (
		<div>
			<TagList
				topics={topics}
				categoryTopicSlugs={categoryTopicSlugs}
				currentCategory={currentCategory}
				currentTopic={currentTopic}
			/>
			{filteredPosts.length > 0 && <Posts posts={filteredPosts} />}
		</div>
	);
}
