import { Typography } from "@material-tailwind/react";
import { ReactNode } from "react";

type Props = {
	children?: ReactNode;
};

export function PostTitle({ children }: Props) {
	return <Typography type="h2">{children}</Typography>;
}
