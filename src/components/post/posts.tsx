import { ExternalPostPreview } from "@/components/post/external-post-preview";
import { PostPreview } from "@/components/post/post-preview";
import { FeedItem } from "@/types/post";

type Props = {
	posts: FeedItem[];
};

export function Posts({ posts }: Props) {
	return (
		<section>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
				{posts.map((item) =>
					item.kind === "post" ? (
						<PostPreview
							key={item.slug}
							title={item.title}
							coverImage={item.coverImage}
							date={item.date}
							slug={item.slug}
							category={item.category}
							topics={item.topics}
							draft={item.draft}
						/>
					) : (
						<ExternalPostPreview
							key={item.url}
							kind={item.kind}
							title={item.title}
							url={item.url}
							date={item.date}
							source={item.source}
							category={item.category}
							topics={item.topics}
						/>
					)
				)}
			</div>
		</section>
	);
}
