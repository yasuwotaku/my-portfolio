import { Typography } from "@material-tailwind/react";

const YEAR = new Date().getFullYear();

export function Footer() {
	return (
		<footer
			className={`
				w-full border-t border-surface p-4 text-center
			`}
		>
			<Typography type="small">&copy;yasuworks.com, 2024-{YEAR}</Typography>
		</footer>
	);
}
export default Footer;
