import { Hashtag } from "iconoir-react";
import Link from "next/link";

type Props = {
	tagCounts: {
		tag: string;
		count: number;
	}[];
};

export function TagList({ tagCounts }: Props) {
	return (
		<div className="m-4 flex flex-wrap gap-2">
			{tagCounts.map(({ tag, count }) => (
				<Link
					key={tag}
					href={`/tags/${tag}`}
					className="flex flex-row items-center rounded-full bg-white px-2 py-0.5 text-lg font-black outline transition-colors hover:bg-gray-300"
				>
					<Hashtag className="w-4.5" />
					{tag}
					<span className="ml-1 font-light">{count}</span>
				</Link>
			))}
		</div>
	);
}
