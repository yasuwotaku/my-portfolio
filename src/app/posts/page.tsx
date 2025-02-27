import Container from "@/app/_components/container";
import { Posts } from "@/app/_components/posts";
import { getAllPosts } from "@/lib/api";

export default function Index() {
	const allPosts = getAllPosts();

	return (
		<main>
			<Container>{allPosts.length > 0 && <Posts posts={allPosts} />}</Container>
		</main>
	);
}
