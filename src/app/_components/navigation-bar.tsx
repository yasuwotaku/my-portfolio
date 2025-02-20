import Link from "next/link";

const NavigationBar = () => {
	return (
		<nav className="sticky top-0">
			<div>
				<Link href="/">yasuworks.com</Link>
			</div>
		</nav>
	);
};

export default NavigationBar;
