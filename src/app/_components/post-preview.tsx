import Link from "next/link";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";
import { Tags } from "./tags";
import SquareImage from "./square-image";

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
			<div>
				<SquareImage slug={slug} title={title} src={coverImage} />
			</div>
			<div>
				<div>
					<h3>
						<Link href={`/posts/${slug}`} className="hover:underline">
							{title}
						</Link>
					</h3>
					<DateFormatter dateString={date} />
				</div>
				<div>
					<Tags tags={tags} />
				</div>
			</div>
		</div>
	);
}
