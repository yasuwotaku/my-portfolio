import Container from "@/app/_components/container";

export default async function Tags(props: Params) {
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
