import { Post } from "@/interfaces/post";
import { PostPreview } from "./post-preview";

type Props = {
	posts: Post[];
};

export function Posts({ posts }: Props) {
	return (
		<section>
			<div>
				{posts.map((post) => (
					<PostPreview
						key={post.slug}
						title={post.title}
						coverImage={post.coverImage}
						date={post.date}
						slug={post.slug}
						tags={post.tags}
					/>
				))}
			</div>
		</section>
	);
}
