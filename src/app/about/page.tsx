import { HobbyList } from "@/components/about/hobby-list";
import { ServiceIcon } from "@/components/icon/service-icon";
import { Container } from "@/components/layout/container";
import { PROFILE } from "@/lib/profile";
import { SITE_NAME } from "@/lib/site";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
	title: `About | ${SITE_NAME}`,
};

export default function About() {
	return (
		<main>
			<Container>
				<div className="mx-auto flex max-w-2xl flex-col gap-4 py-8">
					<section className="flex flex-col items-center gap-3 text-center">
						<Image
							src={PROFILE.icon}
							alt={PROFILE.name}
							width={96}
							height={96}
							priority
							className="size-24 rounded-full bg-white object-cover outline"
						/>
						<div>
							<h1 className="text-2xl font-black">{PROFILE.name}</h1>
							<p className="text-sm font-light text-gray-500">
								{PROFILE.handle}
							</p>
						</div>
						<p className="leading-relaxed">{PROFILE.bio}</p>
						<div className="flex flex-wrap justify-center gap-2">
							{PROFILE.links.map((link) => (
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
					</section>

					<section>
						<h2 className="mt-6 text-sm font-black tracking-widest uppercase">
							TIMELINE
						</h2>
						<ol className="mt-3 flex flex-col gap-2">
							{PROFILE.timeline.map((item) => (
								<li
									key={`${item.period}-${item.description}`}
									className="grid grid-cols-[3em_1fr] gap-x-2"
								>
									<span className="font-black tabular-nums">{item.period}</span>
									<span>{item.description}</span>
								</li>
							))}
						</ol>
					</section>

					<section>
						<h2 className="mt-6 text-sm font-black tracking-widest uppercase">
							SKILLS
						</h2>
						<div className="mt-3 flex flex-col gap-2.5">
							{PROFILE.skills.map((group) => (
								<div
									key={group.name}
									className="grid grid-cols-[5.5em_1fr] items-start gap-x-2 pt-0.5"
								>
									<span className="text-sm font-light text-gray-500">
										{group.name}
									</span>
									<div className="flex flex-wrap gap-1.5">
										{group.skills.map((skill) => (
											<span
												key={skill}
												className="flex shrink-0 rounded-full bg-white px-2 py-0.5 text-sm font-black whitespace-nowrap outline"
											>
												{skill}
											</span>
										))}
									</div>
								</div>
							))}
						</div>
					</section>

					<section>
						<h2 className="mt-6 text-sm font-black tracking-widest uppercase">
							HOBBY
						</h2>
						<div className="mt-3">
							<HobbyList hobbies={PROFILE.hobbies} />
						</div>
					</section>
				</div>
			</Container>
		</main>
	);
}
