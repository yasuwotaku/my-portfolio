import { ReactNode } from "react";

type Props = {
	children?: ReactNode;
};

export function PostTitle({ children }: Props) {
	return (
		<h1
			className={`
				mb-12 text-center text-5xl font-bold leading-tight tracking-tighter
				lg:text-8xl
				md:text-left md:text-7xl md:leading-none
			`}
		>
			{children}
		</h1>
	);
}
