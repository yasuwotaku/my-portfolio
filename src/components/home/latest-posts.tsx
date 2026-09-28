import { FeedCard } from "@/components/post/feed-card";
import { FeedItem } from "@/types/post";
import Link from "next/link";

type Props = {
	posts: FeedItem[];
};

export function LatestPosts({ posts }: Props) {
	return (
		<section>
			<h2 className="mx-4 mt-8 text-sm font-black tracking-widest uppercase">
				Latest
			</h2>
			<div className="grid snap-x snap-mandatory auto-cols-[minmax(220px,260px)] grid-flow-col overflow-x-auto pb-2">
				{posts.map((item) => (
					<div
						key={item.kind === "post" ? item.slug : item.url}
						className="snap-start"
					>
						<FeedCard item={item} />
					</div>
				))}
			</div>
			<div className="mx-4 text-right font-bold">
				<Link href="/posts" className="hover:underline">
					Posts →
				</Link>
			</div>
		</section>
	);
}
