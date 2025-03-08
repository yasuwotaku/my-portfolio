import { Typography } from "@material-tailwind/react";
import { Hashtag } from "iconoir-react";

type Props = {
	tag: string;
};

export function TagHeader({ tag }: Props) {
	return (
		<div className="flex flex-row justify-center">
			<Hashtag className="mr-2 h-auto" />
			<Typography type="h3">{tag}</Typography>
		</div>
	);
}
