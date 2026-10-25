import { ReactNode } from "react";

type Props = {
	children?: ReactNode;
};

export function PostTitle({ children }: Props) {
	return <h1 className="text-3xl">{children}</h1>;
}
