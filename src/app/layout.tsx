import { Footer } from "@/components/layout/footer";
import { NavBar } from "@/components/layout/nav-bar";
import { HOME_OG_IMAGE_URL, SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import cn from "classnames";

import "zenn-content-css";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: SITE_NAME,
	description: SITE_DESCRIPTION,
	openGraph: {
		images: [HOME_OG_IMAGE_URL],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja">
			<head>
				<link rel="icon" href="/icon.svg" type="image/svg+xml" />
				<link rel="icon" href="/favicon.ico" sizes="32x32" />
				<script async src="https://embed.zenn.studio/js/listen-embed-event.js"></script>
			</head>
			<body className={cn(inter.className, `flex min-h-screen flex-col`)}>
				<NavBar />
				<div className="flex-auto">{children}</div>
				<Footer />
			</body>
		</html>
	);
}
