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
			<h3 className="text-3xl mb-3 leading-snug">
				<Link href={`/posts/${slug}`} className="hover:underline">
					{title}
				</Link>
			</h3>
			<div className="text-lg mb-4">
				<DateFormatter dateString={date} />
			</div>
			<ul className="flex gap-x-2">
				{tags.map((tag) => (
					<li key={tag} className="font-bold mb-12">
						<a href={`/tags/${tag}`}>{tag}</a>
					</li>
				))}
			</ul>
		</div>
	);
}
