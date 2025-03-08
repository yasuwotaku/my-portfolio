import cn from "classnames";
import Link from "next/link";
import Image from "next/image";

type Props = {
	title: string;
	src: string;
	alt: string;
	slug?: string;
};

const SquareImage = ({ title, src, alt, slug }: Props) => {
	const image = src ? (
		<Image
			fill
			src={src}
			alt={`Cover Image for ${title}`}
			className={cn(`object-cover`, {
				"grayscale transition-shadow duration-200": slug,
			})}
		/>
	) : (
		<div
			className={`
                flex h-full w-full items-center justify-center
                bg-gray-200 text-gray-500 grayscale text-5xl
              `}
		>
			<span className="break-all">{alt}</span>
		</div>
	);
	return (
		<div className="relative aspect-square w-full drop-shadow">
			{slug ? (
				<Link href={`/posts/${slug}`} aria-label={title}>
					{image}
				</Link>
			) : (
				image
			)}
		</div>
	);
};

export default SquareImage;
