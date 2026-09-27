import { CategorySlug, postsPath } from "@/lib/topics";
import { Category, Topic } from "@/types/post";
import cn from "classnames";
import { Hashtag } from "iconoir-react";
import Link from "next/link";

const CATEGORY_ITEMS: { name: Category; slug: CategorySlug }[] = [
	{ name: "Blog", slug: "blog" },
	{ name: "Zenn", slug: "zenn" },
	{ name: "Qiita", slug: "qiita" },
];

type Props = {
	topics: Topic[];
	currentCategory?: CategorySlug;
	currentTopic?: string;
	categoryTopicSlugs?: Record<CategorySlug, string[]>;
};

export function TagList({
	topics,
	currentCategory,
	currentTopic,
	categoryTopicSlugs = { blog: [], zenn: [], qiita: [] },
}: Props) {
	const isAllSelected = !currentCategory;
	const displayedTopics = currentCategory
		? topics.filter((topic) =>
				categoryTopicSlugs[currentCategory]?.includes(topic.slug)
		  )
		: topics;
	const sortedTopics = [...displayedTopics].sort((a, b) =>
		a.label.localeCompare(b.label)
	);

	return (
		<div className="m-4 flex flex-col gap-2">
			<div className="flex flex-wrap">
				<Link
					href={postsPath(undefined, currentTopic)}
					scroll={false}
					className={cn(
						"m-1 flex shrink-0 flex-row rounded-full px-2 text-base font-black whitespace-nowrap outline transition-colors",
						isAllSelected
							? "bg-black text-white outline-black"
							: "bg-gray-200 outline-gray-200 hover:bg-gray-300 hover:outline-gray-300"
					)}
					aria-current={isAllSelected ? "page" : undefined}
				>
					All
				</Link>
				{CATEGORY_ITEMS.map((item) => {
					const isCurrent = currentCategory === item.slug;
					const hasCombination = currentTopic
						? Boolean(categoryTopicSlugs[item.slug]?.includes(currentTopic))
						: true;
					const href = isCurrent
						? postsPath(undefined, currentTopic)
						: hasCombination
							? postsPath(item.slug, currentTopic)
							: postsPath(item.slug);

					return (
						<Link
							key={item.slug}
							href={href}
							scroll={false}
							className={cn(
								"m-1 flex shrink-0 flex-row rounded-full px-2 text-base font-black whitespace-nowrap outline transition-colors",
								isCurrent
									? "bg-black text-white outline-black"
									: "bg-gray-200 outline-gray-200 hover:bg-gray-300 hover:outline-gray-300"
							)}
							aria-current={isCurrent ? "page" : undefined}
						>
							{item.name}
						</Link>
					);
				})}
			</div>
			<div className="flex flex-wrap">
				{sortedTopics.map((topic) => {
					const isCurrent = currentTopic === topic.slug;
					const href = isCurrent
						? postsPath(currentCategory)
						: postsPath(currentCategory, topic.slug);

					return (
						<Link
							key={topic.slug}
							href={href}
							scroll={false}
							className={cn(
								"m-1 flex shrink-0 flex-row rounded-full px-1 text-sm font-black whitespace-nowrap outline transition-colors",
								isCurrent
									? "bg-black text-white outline-black"
									: "bg-white hover:bg-gray-300"
							)}
							aria-current={isCurrent ? "page" : undefined}
						>
							<Hashtag className="w-3.5" />
							{topic.label}
						</Link>
					);
				})}
			</div>
		</div>
	);
}
