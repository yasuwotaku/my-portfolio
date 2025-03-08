import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";
import { PostTitle } from "@/app/_components/post-title";
import { type Author } from "@/interfaces/author";
import { Tags } from "./tags";
import { Typography } from "@material-tailwind/react";

type Props = {
	title: string;
	coverImage: string;
	date: string;
	author: Author;
	tags: string[];
};

export function PostHeader({ title, coverImage, date, author, tags }: Props) {
	return (
		<div className="mx-auto max-w-2xl">
			<Typography type="small" className="font-bold">
				<DateFormatter dateString={date} />
			</Typography>
			<PostTitle>{title}</PostTitle>
			<div className="h-12 content-center">
				<Tags tags={tags} />
			</div>
			<CoverImage title={title} src={coverImage} />
		</div>
	);
}
