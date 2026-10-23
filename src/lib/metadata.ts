import { HOME_OG_IMAGE_PATH, SITE_NAME } from "@/lib/site";
import type { Metadata } from "next";

// ページ側で openGraph / twitter を指定すると、ルートレイアウトの値は引き継がれず丸ごと置き換わる。
// ページで指定するときは、これを展開してから上書きする。
export const DEFAULT_OPEN_GRAPH = {
	siteName: SITE_NAME,
	locale: "ja_JP",
	type: "website",
	images: [HOME_OG_IMAGE_PATH],
} satisfies Metadata["openGraph"];

export const DEFAULT_TWITTER = {
	card: "summary_large_image",
	images: [HOME_OG_IMAGE_PATH],
} satisfies Metadata["twitter"];
