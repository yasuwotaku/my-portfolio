import { Typography } from "@material-tailwind/react";
import { Breadcrumb, BreadcrumbLink, BreadcrumbSeparator } from "@material-tailwind/react";
import { HomeSimple } from "iconoir-react";

const YEAR = new Date().getFullYear();

const LINKS = [
	{
		title: "About Us",
		href: "#",
	},
	{
		title: "License",
		href: "#",
	},
	{
		title: "Contribute",
		href: "#",
	},
	{
		title: "Contact Us",
		href: "#",
	},
];

export function Footer() {
	return (
		<footer
			className={`
				flex w-full flex-row flex-wrap items-center justify-center gap-x-12 gap-y-3 border-t border-surface py-4 text-center
				md:justify-between
			`}
		>
			<Typography type="small">&copy;yasuworks.com, 2024-{YEAR}</Typography>
			<Breadcrumb>
				<BreadcrumbLink href="/">
					<HomeSimple className="h-[18px] w-[18px]" />
				</BreadcrumbLink>
				<BreadcrumbSeparator />
				<BreadcrumbLink href="posts">Posts</BreadcrumbLink>
				<BreadcrumbSeparator />
				<BreadcrumbLink href="about">About</BreadcrumbLink>
			</Breadcrumb>
		</footer>
	);
}
export default Footer;
