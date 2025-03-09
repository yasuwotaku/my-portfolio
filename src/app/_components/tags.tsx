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
						bg-white flex flex-row m-1 px-1 text-sm font-black outline rounded-full transition-colors
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
