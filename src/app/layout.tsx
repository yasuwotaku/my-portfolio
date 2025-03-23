import NavBar from "@/app/_components/nav-bar";
import Footer from "@/app/_components/footer";
import { SITE_NAME, SITE_DESCRIPTION, HOME_OG_IMAGE_URL } from "@/lib/constants";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import cn from "classnames";

import "zenn-content-css";
import "./globals.css";

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
				<link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
				<meta name="apple-mobile-web-app-title" content="yasuworks.com" />
				<link rel="icon" href="/icon.svg" type="image/svg+xml" />
				<link rel="icon" href="/favicon.ico" sizes="32x32" />
				<link rel="manifest" href="/site.webmanifest" />
				<link rel="alternate" type="application/rss+xml" href="/feed.xml" />
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
