"use client";

import NavBarMenu from "./nav-bar-menu";
import React, { useState } from "react";
import HamburgerMenu from "./hamburger";
import Logo from "./logo";

const NavBar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<header
			className={`
				sticky top-0 z-10 grid items-center p-2 align-middle backdrop-blur-md
				sm:grid-flow-col sm:justify-between
			`}
		>
			<div className={`flex w-full items-center justify-between`}>
				<div className={`sm:hidden`}>
					<HamburgerMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
				</div>
				<Logo />
				<div
					className={`
						w-10
						sm:hidden
					`}
				></div>
			</div>
			<div
				className={`
					w-full place-items-center justify-center
					sm:flex sm:flex-auto sm:justify-end
					${isMenuOpen ? "block" : "hidden"}
				`}
			>
				<NavBarMenu />
			</div>
		</header>
	);
};

export default NavBar;
