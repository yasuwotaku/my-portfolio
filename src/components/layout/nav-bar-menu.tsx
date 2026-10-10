"use client";

import cn from "classnames";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

const menuItems = [
	{
		label: "Home",
		segment: "#",
	},
	{
		label: "Posts",
		segment: "posts",
	},
	{
		label: "About",
		segment: "about",
	},
];

export function NavBarMenu() {
	const segment = useSelectedLayoutSegment();

	const items = menuItems.map((item) => ({
		...item,
		isActive: segment === (item.segment == "#" ? null : item.segment),
	}));

	return (
		<ul className="flex items-center gap-1">
			{items.map((item, i) => (
				<li key={`menu-item-${i}`} className="relative text-sm">
					<Link
						href={`/${item.segment == "#" ? "" : item.segment}`}
						className={cn("group inline-block rounded px-4 py-2 text-lg focus:outline-none focus-visible:outline-2 focus-visible:outline-black", {
							"font-bold": item.isActive,
						})}
						aria-current={item.isActive ? "page" : undefined}
					>
						{item.label}

						<div className="h-[2px] w-0 bg-black transition-all duration-200 group-hover:w-full"></div>
					</Link>
				</li>
			))}
		</ul>
	);
}
