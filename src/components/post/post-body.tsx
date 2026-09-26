type Props = {
	content: string;
};

export function PostBody({ content }: Props) {
	return (
		<div className="znc mx-auto max-w-2xl">
			<div dangerouslySetInnerHTML={{ __html: content }} />
		</div>
	);
}
