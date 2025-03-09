import { Hashtag } from "iconoir-react";

type Props = {
	tag: string;
};

export function TagHeader({ tag }: Props) {
	return (
		<div className="m-4 flex flex-row items-center gap-1 text-lg font-extralight">
			tagged with
			<div
				className={`m-1 flex flex-row rounded-full bg-white px-1 text-sm font-black outline`}
			>
				<Hashtag className="w-3.5" />
				{tag}
			</div>
		</div>
	);
}
