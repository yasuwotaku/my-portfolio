type Props = {
	tag: string;
};

export function TagHeader({ tag }: Props) {
	return (
		<section>
			<h2
				className={`
					mb-8 text-5xl font-bold leading-tight tracking-tighter
					md:text-7xl
				`}
			>
				{tag}
			</h2>
		</section>
	);
}
