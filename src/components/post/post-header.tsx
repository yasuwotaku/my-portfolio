import { CoverImage } from "@/components/post/cover-image";
import { DateFormatter } from "@/components/post/date-formatter";
import { PostTitle } from "@/components/post/post-title";
import { Tags } from "@/components/tag/tags";
import { Post } from "@/types/post";

type Props = Pick<Post, "title" | "coverImage" | "date" | "tags">;

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
