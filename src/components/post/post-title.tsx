import { ReactNode } from "react";

type Props = {
	children?: ReactNode;
};

export function PostTitle({ children }: Props) {
	return <h2 className="text-3xl">{children}</h2>;
}
