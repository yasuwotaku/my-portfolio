import { ExternalPostPreview } from "@/components/post/external-post-preview";
import { PostPreview } from "@/components/post/post-preview";
import { FeedItem } from "@/types/post";

type Props = {
	item: FeedItem;
};

export function FeedCard({ item }: Props) {
	if (item.kind === "post") {
		return (
			<PostPreview
				title={item.title}
				coverImage={item.coverImage}
				date={item.date}
				slug={item.slug}
				category={item.category}
				topics={item.topics}
				draft={item.draft}
			/>
		);
	}

	return (
		<ExternalPostPreview
			kind={item.kind}
			title={item.title}
			url={item.url}
			date={item.date}
			source={item.source}
			category={item.category}
			topics={item.topics}
		/>
	);
}
