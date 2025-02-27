import Container from "@/app/_components/container";

export default async function About(props: Params) {
	return (
		<main>
			<Container></Container>
		</main>
	);
}

type Params = {
	params: Promise<{
		tag: string;
	}>;
};
