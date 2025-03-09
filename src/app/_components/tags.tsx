import { Hashtag } from "iconoir-react";
import Link from "next/link";

type Props = {
	tags: string[];
};

export function Tags({ tags }: Props) {
	return (
		<div className="flex gap-x-1 overflow-x-auto">
			{tags.map((tag) => (
				<Link
					key={tag}
					href={`/tags/${tag}`}
					className={`
						m-1 flex flex-row rounded-full bg-white px-1 text-sm font-black outline transition-colors
						hover:bg-gray-300
					`}
				>
					<Hashtag className="w-3.5" />
					{tag}
				</Link>
			))}
		</div>
	);
}
