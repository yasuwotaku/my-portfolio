import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";
import { PostTitle } from "@/app/_components/post-title";
import { Tags } from "./tags";
import Link from "next/link";

type Props = {
	title: string;
	coverImage: {
		url: string;
		alt: string;
	};
	date: string;
	tags: string[];
};

export function PostHeader({ title, coverImage, date, tags }: Props) {
	return (
		<div className="mx-auto max-w-2xl">
			<div className="text-sm font-bold">
				<DateFormatter dateString={date} />
			</div>
			<PostTitle>{title}</PostTitle>
			<div className="h-12 content-center">
				<Tags tags={tags} />
			</div>
			{coverImage?.url && <CoverImage title={title} src={coverImage.url} />}
		</div>
	);
}
