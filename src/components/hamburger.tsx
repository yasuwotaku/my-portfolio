interface HamburgerMenuProps {
	isOpen: boolean;
	toggleMenu: () => void;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ isOpen, toggleMenu }) => {
	return (
		<button
			className={`
				relative h-10 w-10 text-gray-500
				focus:outline-none
			`}
			onClick={toggleMenu}
		>
			<span className="sr-only">Open main menu</span>
			<div className="absolute left-1/2 top-1/2 block w-5 -translate-x-1/2 -translate-y-1/2 transform">
				<span
					aria-hidden="true"
					className={`
						absolute block h-0.5 w-5 bg-current transition duration-500 ease-in-out
						${isOpen ? "rotate-45" : "-translate-y-1.5"}
					`}
				/>
				<span
					aria-hidden="true"
					className={`
						absolute block h-0.5 w-5 bg-current transition duration-500 ease-in-out
						${isOpen ? "opacity-0" : ""}
					`}
				/>
				<span
					aria-hidden="true"
					className={`
						absolute block h-0.5 w-5 transform bg-current transition duration-500 ease-in-out
						${isOpen ? "-rotate-45" : "translate-y-1.5"}
					`}
				/>
			</div>
		</button>
	);
};

export default HamburgerMenu;
