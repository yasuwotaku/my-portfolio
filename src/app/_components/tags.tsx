import { Button, Typography } from "@material-tailwind/react";
import { Hashtag } from "iconoir-react";

type Props = {
	tags: string[];
};

export function Tags({ tags }: Props) {
	return (
		<div className="flex gap-x-2 overflow-x-auto">
			{tags.map((tag) => (
				<Button
					isPill
					key={tag}
					size="xs"
					as="a"
					href={`/tags/${tag}`}
					variant="outline"
					className="shadow-none"
				>
					<Hashtag className="w-3.5 mr-1" />
					<Typography type="small" className="font-black">
						{tag}
					</Typography>
				</Button>
			))}
		</div>
	);
}
