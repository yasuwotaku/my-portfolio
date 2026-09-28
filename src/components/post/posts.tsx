import { FeedCard } from "@/components/post/feed-card";
import { FeedItem } from "@/types/post";

type Props = {
	posts: FeedItem[];
};

export function Posts({ posts }: Props) {
	return (
		<section>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
				{posts.map((item) => (
					<FeedCard
						key={item.kind === "post" ? item.slug : item.url}
						item={item}
					/>
				))}
			</div>
		</section>
	);
}
