import cn from "classnames";
import { ServiceLogo } from "@/components/post/service-logo";

type Props = {
	title: string;
	url: string;
	source: "zenn" | "qiita";
};

export function ExternalSquareImage({ title, url, source }: Props) {
	return (
		<div className="relative aspect-square w-full drop-shadow grayscale transition-all duration-300 hover:grayscale-0">
			<a
				href={url}
				target="_blank"
				rel="noopener noreferrer"
				aria-label={title}
				className="block size-full"
			>
				<div
					className={cn("flex size-full items-center justify-center", {
						"bg-[#EAF5FF] text-[#3EA8FF]": source === "zenn",
						"bg-[#EEF9E6] text-[#55C500]": source === "qiita",
					})}
				>
					<ServiceLogo source={source} className="size-[38%]" />
				</div>
			</a>
		</div>
	);
}
