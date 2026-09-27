import { CoverImage } from "@/components/post/cover-image";
import { DateFormatter } from "@/components/post/date-formatter";
import { PostTitle } from "@/components/post/post-title";
import { Tags } from "@/components/tag/tags";
import { Post } from "@/types/post";

type Props = Pick<
	Post,
	"title" | "coverImage" | "date" | "category" | "topics" | "draft"
>;

export function PostHeader({
	title,
	coverImage,
	date,
	category,
	topics,
	draft,
}: Props) {
	return (
		<div className="mx-auto max-w-2xl">
			<div className="flex items-center gap-2 text-sm font-bold">
				<DateFormatter dateString={date} />
				{draft && (
					<span className="rounded-full px-2 text-xs font-black tracking-wider uppercase outline outline-dashed">
						Draft
					</span>
				)}
			</div>
			<PostTitle>{title}</PostTitle>
			<div className="h-12 content-center">
				<Tags category={category} topics={topics} />
			</div>
			{coverImage?.url && <CoverImage title={title} src={coverImage.url} />}
		</div>
	);
}
