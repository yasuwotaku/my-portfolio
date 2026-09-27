import cn from "classnames";
import { Hashtag } from "iconoir-react";
import Link from "next/link";

type Props = {
	tags: string[];
	current?: string;
};

export function TagList({ tags, current }: Props) {
	const isAllSelected = !current;

	return (
		<div className="m-4 flex flex-wrap">
			<Link
				href="/tags"
				className={cn(
					"m-1 flex flex-row rounded-full px-1 text-sm font-black outline transition-colors",
					isAllSelected ? "bg-black text-white" : "bg-white hover:bg-gray-300"
				)}
				aria-current={isAllSelected ? "page" : undefined}
			>
				All
			</Link>
			{tags.map((tag) => {
				const isCurrent = current === tag;
				return (
					<Link
						key={tag}
						href={`/tags/${tag}`}
						className={cn(
							"m-1 flex flex-row rounded-full px-1 text-sm font-black outline transition-colors",
							isCurrent ? "bg-black text-white" : "bg-white hover:bg-gray-300"
						)}
						aria-current={isCurrent ? "page" : undefined}
					>
						<Hashtag className="w-3.5" />
						{tag}
					</Link>
				);
			})}
		</div>
	);
}
