import { ServiceIcon } from "@/components/icon/service-icon";
import { ProfileLink } from "@/lib/profile";
import cn from "classnames";

type Props = {
	links: ProfileLink[];
	className?: string;
};

export function ProfileLinks({ links, className }: Props) {
	return (
		<div className={cn("flex flex-wrap gap-2", className)}>
			{links.map((link) => (
				<a
					key={link.service}
					href={link.url}
					target="_blank"
					rel="noopener noreferrer"
					className="flex shrink-0 items-center gap-1.5 rounded-full bg-gray-200 px-3 py-1 text-sm font-black whitespace-nowrap outline outline-gray-200 transition-colors hover:bg-gray-300 hover:outline-gray-300"
				>
					<ServiceIcon service={link.service} className="size-3.5" />
					<span>{link.label}</span>
				</a>
			))}
		</div>
	);
}
