import Container from "@/app/_components/container";

export default async function Index(props: Params) {
	return (
		<main>
			<Container>
				<div className="w-full text-center font-black">coming soon...</div>
			</Container>
		</main>
	);
}

type Params = {
	params: Promise<{
		tag: string;
	}>;
};
