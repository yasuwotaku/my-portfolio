import Link from "next/link";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";
import { Tags } from "./tags";
import SquareImage from "./square-image";
import { Typography } from "@material-tailwind/react";

type Props = {
	title: string;
	coverImage: string;
	date: string;
	slug: string;
	tags: string[];
};

export function PostPreview({ title, coverImage, date, slug, tags }: Props) {
	return (
		<div className="flex flex-col p-4">
			<SquareImage slug={slug} title={title} src={coverImage} />
			<Typography type="small" className="font-bold">
				<DateFormatter dateString={date} />
			</Typography>
			<Typography
				as="a"
				href={`/posts/${slug}`}
				className={`
					line-clamp-2 h-12
					hover:underline
				`}
			>
				{title}
			</Typography>
			<Tags tags={tags} />
		</div>
	);
}
