import DateFormatter from "./date-formatter";
import { Tags } from "./tags";
import SquareImage from "./square-image";
import { Typography } from "@material-tailwind/react";

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
		<div className="flex flex-col p-4 gap-1">
			<SquareImage slug={slug} title={title} src={coverImage.url} alt={coverImage.alt} />
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
