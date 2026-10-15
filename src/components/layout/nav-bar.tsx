"use client";

import { HamburgerMenu } from "@/components/layout/hamburger";
import { Logo } from "@/components/layout/logo";
import { NavBarMenu } from "@/components/layout/nav-bar-menu";
import cn from "classnames";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function NavBar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const pathname = usePathname();

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	// Next.js Navigation recommends using useEffect to respond to route changes
	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setIsMenuOpen(false);
	}, [pathname]);

	useEffect(() => {
		if (!isMenuOpen) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				setIsMenuOpen(false);
				document.getElementById("hamburger-menu-button")?.focus();
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [isMenuOpen]);

	return (
		<header className="sticky top-0 z-10 grid items-center p-2 align-middle backdrop-blur-md sm:grid-flow-col sm:justify-between">
			<div className="flex w-full items-center justify-between">
				<div className="sm:hidden">
					<HamburgerMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
				</div>
				<Logo />
				<div className="w-10 sm:hidden"></div>
			</div>
			<nav
				aria-label="メイン"
				className={cn(
					"w-full place-items-center justify-center sm:flex sm:flex-auto sm:justify-end",
					isMenuOpen ? "block" : "hidden"
				)}
			>
				<NavBarMenu />
			</nav>
		</header>
	);
}
