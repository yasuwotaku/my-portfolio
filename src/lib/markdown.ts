import zennMarkdownToHtml from "zenn-markdown-html";

export async function markdownToHtml(markdown: string) {
	return zennMarkdownToHtml(markdown, {
		embedOrigin: "https://embed.zenn.studio",
	});
}
