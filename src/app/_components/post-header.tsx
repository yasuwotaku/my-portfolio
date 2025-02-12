import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";
import { PostTitle } from "@/app/_components/post-title";
import { type Author } from "@/interfaces/author";

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
			<div
				className={`
					hidden
					md:mb-12 md:block
				`}
			>
				<Avatar name={author.name} picture={author.picture} />
			</div>
			<ul className={`flex gap-x-2`}>
				{tags.map((tag) => (
					<li key={tag} className={`mb-12 font-bold`}>
						<a href={`/tags/${tag}`}>{tag}</a>
					</li>
				))}
			</ul>
			<div
				className={`
					mb-8
					md:mb-16
					sm:mx-0
				`}
			>
				<CoverImage title={title} src={coverImage} />
			</div>
			<div className={`mx-auto max-w-2xl`}>
				<div
					className={`
						mb-6 block
						md:hidden
					`}
				>
					<Avatar name={author.name} picture={author.picture} />
				</div>
				<div className={`mb-6 text-lg`}>
					<DateFormatter dateString={date} />
				</div>
			</div>
		</>
	);
}
