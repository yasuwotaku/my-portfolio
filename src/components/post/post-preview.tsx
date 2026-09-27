import { DateFormatter } from "@/components/post/date-formatter";
import { SquareImage } from "@/components/post/square-image";
import { Tags } from "@/components/tag/tags";
import { Post } from "@/types/post";
import Link from "next/link";

type Props = Pick<
	Post,
	"title" | "coverImage" | "date" | "slug" | "category" | "topics" | "draft"
>;

export function PostPreview({
	title,
	coverImage,
	date,
	slug,
	category,
	topics,
	draft,
}: Props) {
	return (
		<div className="flex flex-col gap-1 p-4">
			<SquareImage
				slug={slug}
				title={title}
				src={coverImage.url}
				alt={coverImage.alt}
			/>
			<div className="flex items-center gap-2 text-sm font-bold">
				<DateFormatter dateString={date} />
				{draft && (
					<span className="rounded-full px-2 text-xs font-black tracking-wider uppercase outline outline-dashed">
						Draft
					</span>
				)}
			</div>
			<Link
				href={`/posts/${slug}`}
				className="line-clamp-2 h-12 hover:underline"
			>
				{title}
			</Link>
			<Tags category={category} topics={topics} />
		</div>
	);
}
