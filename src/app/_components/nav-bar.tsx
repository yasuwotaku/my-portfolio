"use client";

import { Typography } from "@material-tailwind/react";
import NavBarMenu from "./nav-bar-menu";
import React, { useState } from "react";
import HamburgerMenu from "./hamburger";

const NavBar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<header
			className={`
				sticky top-0 z-10 flex h-20 flex-row content-center items-center justify-center p-2 backdrop-blur-md
				sm:justify-between
			`}
		>
			<div className={`sm:hidden`}>
				<HamburgerMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
			</div>
			<div
				className={`
					ml-2 mr-2 flex-1 py-1 text-center tracking-tighter underline
					sm:ml-0 sm:mr-0 sm:flex-none sm:text-left
				`}
			>
				<Typography as="a" href="/" className={`p-4 text-2xl font-light underline`}>
					<strong className="font-black">yasuworks</strong>.com
				</Typography>
			</div>
			<div
				className={`
					hidden flex-auto justify-end
					sm:flex
				`}
			>
				<NavBarMenu />
			</div>
		</header>
	);
};

export default NavBar;
