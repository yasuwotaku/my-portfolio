import { Footer } from "@/components/layout/footer";
import { NavBar } from "@/components/layout/nav-bar";
import { HOME_OG_IMAGE_PATH, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import cn from "classnames";

import "zenn-content-css";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	title: {
		default: SITE_NAME,
		template: `%s | ${SITE_NAME}`,
	},
	description: SITE_DESCRIPTION,
	openGraph: {
		siteName: SITE_NAME,
		locale: "ja_JP",
		type: "website",
		images: [HOME_OG_IMAGE_PATH],
	},
	twitter: {
		card: "summary_large_image",
		images: [HOME_OG_IMAGE_PATH],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja" suppressHydrationWarning>
			<head>
				<link rel="icon" href="/icon.svg" type="image/svg+xml" />
				<link rel="icon" href="/favicon.ico" sizes="32x32" />
				{/* /posts をフィルタ付きで開いたとき、絞り込み前の全記事が一瞬見えるのを防ぐ */}
				<script
					dangerouslySetInnerHTML={{
						__html: `if(location.pathname==='/posts'&&location.search)document.documentElement.classList.add('has-filter');`,
					}}
				/>
			</head>
			<body className={cn(inter.className, "flex min-h-screen flex-col")}>
				<NavBar />
				<div className="flex-auto">{children}</div>
				<Footer />
			</body>
		</html>
	);
}
