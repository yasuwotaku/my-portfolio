import { CategorySlug } from "@/lib/topics";
import { Category, Topic } from "@/types/post";
import cn from "classnames";
import { Hashtag } from "iconoir-react";
import Link from "next/link";

const CATEGORY_ITEMS: { name: Category; slug: CategorySlug }[] = [
	{ name: "Blog", slug: "blog" },
	{ name: "Tech", slug: "tech" },
	{ name: "Zenn", slug: "zenn" },
	{ name: "Qiita", slug: "qiita" },
];

type Props = {
	topics: Topic[];
	currentSlug?: string;
};

export function TagList({ topics, currentSlug }: Props) {
	const isAllSelected = !currentSlug;
	const sortedTopics = [...topics].sort((a, b) =>
		a.label.localeCompare(b.label)
	);

	return (
		<div className="m-4 flex flex-col gap-2">
			<div className="flex flex-wrap">
				<Link
					href="/tags"
					className={cn(
						"m-1 flex flex-row rounded-full px-2 text-base font-black outline transition-colors",
						isAllSelected ? "bg-black text-white" : "bg-white hover:bg-gray-300"
					)}
					aria-current={isAllSelected ? "page" : undefined}
				>
					All
				</Link>
				{CATEGORY_ITEMS.map((item) => {
					const isCurrent = currentSlug === item.slug;
					return (
						<Link
							key={item.slug}
							href={`/tags/${item.slug}`}
							className={cn(
								"m-1 flex flex-row rounded-full px-2 text-base font-black outline transition-colors",
								isCurrent ? "bg-black text-white" : "bg-white hover:bg-gray-300"
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
					const isCurrent = currentSlug === topic.slug;
					return (
						<Link
							key={topic.slug}
							href={`/tags/${topic.slug}`}
							className={cn(
								"m-1 flex flex-row rounded-full px-1 text-sm font-black outline transition-colors",
								isCurrent ? "bg-black text-white" : "bg-white hover:bg-gray-300"
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
