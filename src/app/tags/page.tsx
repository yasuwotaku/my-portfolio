import { Container } from "@/components/layout/container";
import { TagList } from "@/components/tag/tag-list";
import { getTagCounts } from "@/lib/posts";
import { SITE_NAME } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: `Tags | ${SITE_NAME}`,
};

export default async function Index() {
	const tagCounts = await getTagCounts();

	return (
		<main>
			<Container>
				<TagList tagCounts={tagCounts} />
			</Container>
		</main>
	);
}
