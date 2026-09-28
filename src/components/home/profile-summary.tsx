import { ProfileLinks } from "@/components/about/profile-links";
import { PROFILE } from "@/lib/profile";
import Image from "next/image";
import Link from "next/link";

export function ProfileSummary() {
	return (
		<section className="mx-4 mt-10 mb-8">
			<div className="grid grid-cols-[auto_1fr] items-center gap-4 sm:grid-cols-[auto_1fr_auto]">
				<Image
					src={PROFILE.icon}
					alt={PROFILE.name}
					width={72}
					height={72}
					className="size-[72px] rounded-full bg-white object-cover outline"
				/>
				<div className="flex flex-col gap-1.5">
					<div className="text-lg font-black">{PROFILE.name}</div>
					<p className="text-sm leading-relaxed text-gray-700">{PROFILE.bio}</p>
					<ProfileLinks links={PROFILE.links} />
				</div>
				<Link
					href="/about"
					className="col-span-2 self-end justify-self-end font-bold whitespace-nowrap hover:underline sm:col-span-1"
				>
					About →
				</Link>
			</div>
		</section>
	);
}
