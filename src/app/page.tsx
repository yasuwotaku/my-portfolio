import { Container } from "@/components/layout/container";
import { Posts } from "@/components/post/posts";
import { getFeedItems } from "@/lib/posts";

export default async function Index() {
	const feedItems = await getFeedItems();

	return (
		<main>
			<Container>{feedItems.length > 0 && <Posts posts={feedItems} />}</Container>
		</main>
	);
}

