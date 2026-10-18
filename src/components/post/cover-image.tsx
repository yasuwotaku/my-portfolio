import cn from "classnames";
import Link from "next/link";
import Image from "next/image";

type Props = {
	title: string;
	src: string;
	alt?: string;
	slug?: string;
};

export function CoverImage({ title, src, alt, slug }: Props) {
	const image = (
		<Image
			src={src}
			alt={alt || ""}
			className={cn("w-full drop-shadow", {
				"transition-shadow duration-200": slug,
			})}
			width={1300}
			height={630}
		/>
	);
	return (
		<div className="sm:mx-0">
			{slug ? (
				<Link href={`/posts/${slug}`} aria-label={title}>
					{image}
				</Link>
			) : (
				image
			)}
		</div>
	);
}
