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
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
				{posts.map((item) => (
					<FeedCard key={item.kind === "post" ? item.slug : item.url} item={item} />
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
