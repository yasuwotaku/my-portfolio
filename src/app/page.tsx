import { HeroPost } from "@/components/home/hero-post";
import { LatestPosts } from "@/components/home/latest-posts";
import { ProfileSummary } from "@/components/home/profile-summary";
import { Container } from "@/components/layout/container";
import { DEFAULT_OPEN_GRAPH } from "@/lib/metadata";
import { getFeaturedPost, getFeedItems } from "@/lib/posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
	alternates: {
		canonical: "/",
	},
	openGraph: {
		...DEFAULT_OPEN_GRAPH,
		url: "/",
	},
};

export default async function Index() {
	const featuredPost = getFeaturedPost();
	const feedItems = await getFeedItems();

	const latestPosts = feedItems
		.filter(
			(item) =>
				!(
					featuredPost &&
					item.kind === "post" &&
					item.slug === featuredPost.slug
				)
		)
		.slice(0, 6);

	return (
		<main>
			<h1 className="sr-only">ホーム</h1>
			<Container>
				{featuredPost && <HeroPost post={featuredPost} />}
				{latestPosts.length > 0 && <LatestPosts posts={latestPosts} />}
				<ProfileSummary />
			</Container>
		</main>
	);
}
