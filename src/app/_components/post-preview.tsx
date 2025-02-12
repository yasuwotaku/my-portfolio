import { type Author } from "@/interfaces/author";
import Link from "next/link";
import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";

type Props = {
	title: string;
	coverImage: string;
	date: string;
	slug: string;
	tags: string[];
};

export function PostPreview({ title, coverImage, date, slug, tags }: Props) {
	return (
		<div>
			<div className="mb-5">
				<CoverImage slug={slug} title={title} src={coverImage} />
			</div>
			<h3 className={`mb-3 text-3xl leading-snug`}>
				<Link href={`/posts/${slug}`} className="hover:underline">
					{title}
				</Link>
			</h3>
			<div className={`mb-4 text-lg`}>
				<DateFormatter dateString={date} />
			</div>
			<ul className={`flex gap-x-2`}>
				{tags.map((tag) => (
					<li key={tag} className={`mb-12 font-bold`}>
						<a href={`/tags/${tag}`}>{tag}</a>
					</li>
				))}
			</ul>
		</div>
	);
}
