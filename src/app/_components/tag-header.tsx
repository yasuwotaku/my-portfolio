type Props = {
	tag: string;
};

export function TagHeader({ tag }: Props) {
	return (
		<section>
			<h2>{tag}</h2>
		</section>
	);
}
