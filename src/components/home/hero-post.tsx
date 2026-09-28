import { DateFormatter } from "@/components/post/date-formatter";
import { Tags } from "@/components/tag/tags";
import { Post } from "@/types/post";
import Image from "next/image";
import Link from "next/link";

type Props = {
	post: Post;
};

export function HeroPost({ post }: Props) {
	return (
		<section className="mx-4 flex flex-col gap-1.5">
			<div className="relative aspect-video w-full drop-shadow grayscale transition-all duration-300 hover:grayscale-0">
				<Link href={`/posts/${post.slug}`} aria-label={post.title}>
					<Image
						fill
						priority
						src={post.coverImage.url}
						alt={post.coverImage.alt || `Cover Image for ${post.title}`}
						className="object-cover"
					/>
				</Link>
			</div>
			<div className="flex items-center gap-2 text-sm font-bold">
				<DateFormatter dateString={post.date} />
				{post.draft && (
					<span className="rounded-full px-2 text-xs font-black tracking-wider uppercase outline outline-dashed">
						Draft
					</span>
				)}
			</div>
			<Link
				href={`/posts/${post.slug}`}
				className="text-2xl leading-snug text-balance hover:underline sm:text-3xl"
			>
				{post.title}
			</Link>
			<Tags category={post.category} topics={post.topics} />
		</section>
	);
}
