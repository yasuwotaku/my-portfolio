const YEAR = new Date().getFullYear();

export function Footer() {
	return (
		<footer className="w-full border-t p-4 text-center">
			<div className="text-sm">&copy;yasuworks.com, 2024-{YEAR}</div>
		</footer>
	);
}
