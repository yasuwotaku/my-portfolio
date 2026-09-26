import { DateFormatter } from "@/components/post/date-formatter";
import { SquareImage } from "@/components/post/square-image";
import { Tags } from "@/components/tag/tags";
import { Post } from "@/types/post";
import Link from "next/link";

type Props = Pick<Post, "title" | "coverImage" | "date" | "slug" | "tags">;

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
