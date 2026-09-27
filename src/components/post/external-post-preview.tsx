import { DateFormatter } from "@/components/post/date-formatter";
import { ExternalSquareImage } from "@/components/post/external-square-image";
import { Tags } from "@/components/tag/tags";
import { ExternalPostItem } from "@/types/post";
import { OpenNewWindow } from "iconoir-react";

export function ExternalPostPreview({
	title,
	url,
	date,
	source,
	tags,
}: ExternalPostItem) {
	return (
		<div className="flex flex-col gap-1 p-4">
			<ExternalSquareImage
				title={title}
				url={url}
				source={source}
			/>
			<div className="text-sm font-bold">
				<DateFormatter dateString={date} />
			</div>
			<a
				href={url}
				target="_blank"
				rel="noopener noreferrer"
				className="line-clamp-2 h-12 hover:underline"
			>
				<span>{title}</span>
				<OpenNewWindow className="ml-1 inline-block size-3.5 shrink-0 align-[-0.125em]" />
			</a>
			<Tags tags={tags} />
		</div>
	);
}
