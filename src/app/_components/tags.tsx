import { Button, Typography } from "@material-tailwind/react";

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
					<Typography type="small" className="font-black">
						{tag}
					</Typography>
				</Button>
			))}
		</div>
	);
}
