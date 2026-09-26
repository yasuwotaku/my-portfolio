type Props = {
	content: string;
};

export function PostBody({ content }: Props) {
	return (
		<div className="mx-auto max-w-2xl znc">
			<div dangerouslySetInnerHTML={{ __html: content }} />
		</div>
	);
}
