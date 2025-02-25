import { Typography } from "@material-tailwind/react";
import NavBarMenu from "./nav-bar-menu";

const NavBar = () => {
	return (
		<header className="sticky top-0 z-10 flex h-20 flex-row content-center items-center justify-between p-2 backdrop-blur-md">
			<Typography
				as="a"
				href="/"
				className="ml-2 mr-2 inline py-1 text-2xl font-light tracking-tighter underline"
			>
				<strong className="font-black">yasuworks</strong>.com
			</Typography>
			<NavBarMenu />
		</header>
	);
};

export default NavBar;
