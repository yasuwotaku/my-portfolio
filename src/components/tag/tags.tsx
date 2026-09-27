import { categoryToSlug, postsPath } from "@/lib/topics";
import { Category, Topic } from "@/types/post";
import { Hashtag } from "iconoir-react";
import Link from "next/link";

type Props = {
	category: Category;
	topics: Topic[];
};

export function Tags({ category, topics }: Props) {
	const categorySlug = categoryToSlug(category);

	return (
		<div className="flex gap-x-1 overflow-x-auto">
			<Link
				href={postsPath(categorySlug)}
				className="m-1 flex shrink-0 flex-row rounded-full bg-gray-200 px-2 text-sm font-black whitespace-nowrap outline outline-gray-200 transition-colors hover:bg-gray-300 hover:outline-gray-300"
			>
				{category}
			</Link>
			{topics.map((topic) => (
				<Link
					key={topic.slug}
					href={postsPath(undefined, topic.slug)}
					className="m-1 flex shrink-0 flex-row rounded-full bg-white px-1 text-sm font-black whitespace-nowrap outline transition-colors hover:bg-gray-300"
				>
					<Hashtag className="w-3.5" />
					{topic.label}
				</Link>
			))}
		</div>
	);
}
