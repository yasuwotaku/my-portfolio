import { HeroPost } from "@/components/home/hero-post";
import { LatestPosts } from "@/components/home/latest-posts";
import { ProfileSummary } from "@/components/home/profile-summary";
import { Container } from "@/components/layout/container";
import { getFeaturedPost, getFeedItems } from "@/lib/posts";

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
		.slice(0, 5);

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
