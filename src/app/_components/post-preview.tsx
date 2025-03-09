import DateFormatter from "./date-formatter";
import { Tags } from "./tags";
import SquareImage from "./square-image";
import Link from "next/link";

type Props = {
	title: string;
	coverImage: {
		url: string;
		alt: string;
	};
	date: string;
	slug: string;
	tags: string[];
};

export function PostPreview({ title, coverImage, date, slug, tags }: Props) {
	return (
		<div className="flex flex-col gap-1 p-4">
			<SquareImage slug={slug} title={title} src={coverImage.url} alt={coverImage.alt} />
			<div className="text-sm font-bold">
				<DateFormatter dateString={date} />
			</div>
			<Link
				href={`/posts/${slug}`}
				className={`
					line-clamp-2 h-12
					hover:underline
				`}
			>
				{title}
			</Link>
			<Tags tags={tags} />
		</div>
	);
}
