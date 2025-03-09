import Link from "next/link";

export function Logo() {
	return (
		<Link href="/" className={`p-2 text-center text-2xl font-light tracking-tighter underline`}>
			<strong className="font-black">yasuworks</strong>.com
		</Link>
	);
}
export default Logo;
