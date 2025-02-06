import zennMarkdownToHtml from "zenn-markdown-html";

export default async function markdownToHtml(markdown: string) {
  return zennMarkdownToHtml(markdown);
}
