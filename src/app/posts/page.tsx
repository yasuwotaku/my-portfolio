import { Container } from "@/components/layout/container";
import { Posts } from "@/components/post/posts";
import { getAllPosts } from "@/lib/posts";

export default function Index() {
	const allPosts = getAllPosts();

	return (
		<main>
			<Container>{allPosts.length > 0 && <Posts posts={allPosts} />}</Container>
		</main>
	);
}
