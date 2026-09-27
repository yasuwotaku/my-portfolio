"use client";

import { Hobby } from "@/lib/profile";
import cn from "classnames";
import { NavArrowDown } from "iconoir-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Props = {
	hobbies: Hobby[];
};

function hasDetail(hobby: Hobby) {
	return Boolean(hobby.description || hobby.link || hobby.photos?.length);
}

export function HobbyList({ hobbies }: Props) {
	// 最初から詳細が見えるよう、詳細のある先頭の項目を開いておく
	const [selected, setSelected] = useState(hobbies.find(hasDetail)?.name);
	const current = hobbies.find((hobby) => hobby.name === selected);

	return (
		<div className="flex flex-col gap-3">
			<div className="flex flex-wrap gap-1.5">
				{hobbies.map((hobby) =>
					hasDetail(hobby) ? (
						<button
							key={hobby.name}
							type="button"
							aria-expanded={hobby.name === selected}
							onClick={() => setSelected(hobby.name === selected ? undefined : hobby.name)}
							className={cn(
								"flex shrink-0 cursor-pointer items-center gap-0.5 rounded-full py-0.5 pr-1 pl-2 text-sm font-black whitespace-nowrap outline transition-colors",
								hobby.name === selected
									? "bg-black text-white outline-black"
									: "bg-white hover:bg-gray-300"
							)}
						>
							{hobby.name}
							<NavArrowDown
								aria-hidden="true"
								className={cn("size-3.5 transition-transform duration-200", {
									"rotate-180": hobby.name === selected,
								})}
							/>
						</button>
					) : (
						<span
							key={hobby.name}
							className="flex shrink-0 rounded-full bg-white px-2 py-0.5 text-sm font-black whitespace-nowrap outline"
						>
							{hobby.name}
						</span>
					)
				)}
			</div>
			{current && (
				<div className="flex flex-col gap-3">
					{(current.description || current.link) && (
						<p className="leading-relaxed">
							{current.description}
							{current.link && (
								<Link
									href={current.link.href}
									className="ml-1.5 underline underline-offset-2 transition-colors hover:text-gray-600"
								>
									{current.link.label}
								</Link>
							)}
						</p>
					)}
					{current.photos && current.photos.length > 0 && (
						<div className="grid grid-cols-3 gap-2">
							{current.photos.map((photo) => (
								<div
									key={photo.src}
									className="relative aspect-square w-full drop-shadow grayscale transition-all duration-300 hover:grayscale-0"
								>
									<Image
										src={photo.src}
										alt={photo.alt}
										fill
										sizes="(max-width: 672px) 33vw, 214px"
										className="object-cover"
									/>
								</div>
							))}
						</div>
					)}
				</div>
			)}
		</div>
	);
}
