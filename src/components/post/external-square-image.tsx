import Image from "next/image";

type Props = {
	title: string;
	url: string;
	src?: string;
	source: "zenn" | "qiita";
};

export function ExternalSquareImage({ title, url, src, source }: Props) {
	const sourceLabel = source === "zenn" ? "Zenn" : "Qiita";
	const image = src ? (
		<div className="relative size-full bg-gray-200">
			<Image
				fill
				src={src}
				alt={`Cover Image for ${title}`}
				className="object-contain"
				unoptimized
			/>
		</div>
	) : (
		<div className="flex size-full items-center justify-center bg-gray-200 text-5xl text-gray-500">
			<span className="break-all">{sourceLabel}</span>
		</div>
	);

	return (
		<div className="relative aspect-square w-full drop-shadow grayscale transition-all duration-300 hover:grayscale-0">
			<a
				href={url}
				target="_blank"
				rel="noopener noreferrer"
				aria-label={title}
			>
				{image}
			</a>
		</div>
	);
}
