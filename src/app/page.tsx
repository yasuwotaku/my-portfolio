import { Container } from "@/components/layout/container";
import { Posts } from "@/components/post/posts";
import { getFeedItems } from "@/lib/posts";
import { SITE_DESCRIPTION } from "@/lib/site";
import Link from "next/link";

export default async function Index() {
	const feedItems = await getFeedItems();
	const latestPosts = feedItems.slice(0, 6);

	return (
		<main>
			<Container>
				<p className="m-4 text-gray-600">{SITE_DESCRIPTION}</p>
				<section>
					<h2 className="m-4 text-lg font-extralight">Latest</h2>
					{latestPosts.length > 0 && <Posts posts={latestPosts} />}
					<div className="m-4 text-right">
						<Link href="/posts" className="hover:underline">
							All posts →
						</Link>
					</div>
				</section>
			</Container>
		</main>
	);
}
