import cn from "classnames";

type Props = {
	isOpen: boolean;
	toggleMenu: () => void;
};

export function HamburgerMenu({ isOpen, toggleMenu }: Props) {
	return (
		<button
			type="button"
			className="relative size-10 rounded-sm text-gray-500 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
			onClick={toggleMenu}
			aria-expanded={isOpen}
		>
			<span className="sr-only">{isOpen ? "メニューを閉じる" : "メニューを開く"}</span>
			<div className="absolute top-1/2 left-1/2 block w-5 -translate-1/2 transform">
				<span
					aria-hidden="true"
					className={cn(
						"absolute block h-0.5 w-5 bg-current transition duration-500 ease-in-out",
						isOpen ? "rotate-45" : "-translate-y-1.5"
					)}
				/>
				<span
					aria-hidden="true"
					className={cn(
						"absolute block h-0.5 w-5 bg-current transition duration-500 ease-in-out",
						isOpen ? "opacity-0" : ""
					)}
				/>
				<span
					aria-hidden="true"
					className={cn(
						"absolute block h-0.5 w-5 transform bg-current transition duration-500 ease-in-out",
						isOpen ? "-rotate-45" : "translate-y-1.5"
					)}
				/>
			</div>
		</button>
	);
}
