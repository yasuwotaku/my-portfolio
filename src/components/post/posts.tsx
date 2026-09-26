import { PostPreview } from "@/components/post/post-preview";
import { Post } from "@/types/post";

type Props = {
	posts: Post[];
};

export function Posts({ posts }: Props) {
	return (
		<section>
			<div
				className={`
					grid grid-cols-1
					lg:grid-cols-3
					sm:grid-cols-2
				`}
			>
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
