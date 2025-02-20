import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";
import { PostTitle } from "@/app/_components/post-title";
import { type Author } from "@/interfaces/author";
import { Tags } from "./tags";

type Props = {
	title: string;
	coverImage: string;
	date: string;
	author: Author;
	tags: string[];
};

export function PostHeader({ title, coverImage, date, author, tags }: Props) {
	return (
		<>
			<PostTitle>{title}</PostTitle>
			<Tags tags={tags} />
			<div>
				<CoverImage title={title} src={coverImage} />
			</div>
			<div className={`mx-auto max-w-2xl`}>
				<div className={`mb-6 text-lg`}>
					<DateFormatter dateString={date} />
				</div>
			</div>
		</>
	);
}
