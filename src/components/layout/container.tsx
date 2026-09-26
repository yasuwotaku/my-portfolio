type Props = {
	children?: React.ReactNode;
};

export function Container({ children }: Props) {
	return <div className="px-4">{children}</div>;
}
