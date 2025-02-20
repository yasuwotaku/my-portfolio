import cn from "classnames";
import Link from "next/link";
import Image from "next/image";

type Props = {
	title: string;
	src: string;
	slug?: string;
};

const SquareImage = ({ title, src, slug }: Props) => {
	const image = (
		<Image
			fill
			src={src}
			alt={`Cover Image for ${title}`}
			className={cn(`object-cover`, {
				"transition-shadow duration-200": slug,
			})}
		/>
	);
	return (
		<div className="relative h-full w-full">
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
