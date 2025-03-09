import { Hashtag } from "iconoir-react";

type Props = {
	tag: string;
};

export function TagHeader({ tag }: Props) {
	return (
		<div className="flex flex-row justify-center">
			<Hashtag className="mr-1 h-auto" />
			<h3 className="text-2xl">{tag}</h3>
		</div>
	);
}
