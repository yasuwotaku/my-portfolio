import { HeroPost } from "@/components/home/hero-post";
import { LatestPosts } from "@/components/home/latest-posts";
import { ProfileSummary } from "@/components/home/profile-summary";
import { Container } from "@/components/layout/container";
import { getFeaturedPost, getFeedItems } from "@/lib/posts";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: SITE_NAME,
	description: SITE_DESCRIPTION,
	alternates: {
		canonical: "/",
	},
	openGraph: {
		title: SITE_NAME,
		description: SITE_DESCRIPTION,
		url: "/",
	},
	twitter: {
		title: SITE_NAME,
		description: SITE_DESCRIPTION,
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
			<Container>
				{featuredPost && <HeroPost post={featuredPost} />}
				{latestPosts.length > 0 && <LatestPosts posts={latestPosts} />}
				<ProfileSummary />
			</Container>
		</main>
	);
}
