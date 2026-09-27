import { categoryToSlug } from "@/lib/topics";
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
				href={`/tags/${categorySlug}`}
				className="m-1 flex flex-row rounded-full bg-gray-200 px-2 text-sm font-black transition-colors hover:bg-gray-300"
			>
				{category}
			</Link>
			{topics.map((topic) => (
				<Link
					key={topic.slug}
					href={`/tags/${topic.slug}`}
					className="m-1 flex flex-row rounded-full bg-white px-1 text-sm font-black outline transition-colors hover:bg-gray-300"
				>
					<Hashtag className="w-3.5" />
					{topic.label}
				</Link>
			))}
		</div>
	);
}
