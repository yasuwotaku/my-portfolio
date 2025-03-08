import { Typography } from "@material-tailwind/react";

export function Logo() {
	return (
		<Typography
			as="a"
			href="/"
			className={`p-2 text-center text-2xl font-light tracking-tighter underline`}
		>
			<strong className="font-black">yasuworks</strong>.com
		</Typography>
	);
}
export default Logo;
