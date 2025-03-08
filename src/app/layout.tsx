import NavBar from "@/app/_components/nav-bar";
import Footer from "@/app/_components/footer";
import { SITE_NAME, HOME_OG_IMAGE_URL } from "@/lib/constants";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import cn from "classnames";

import "zenn-content-css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: SITE_NAME,
	description: `A statically generated blog example using Next.js and Markdown.`,
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
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
				<link rel="manifest" href="/favicon/site.webmanifest" />
				<link rel="shortcut icon" href="/favicon/favicon.ico" />
				<meta name="msapplication-TileColor" content="#000000" />
				<meta name="msapplication-config" content="/favicon/browserconfig.xml" />
				<meta name="theme-color" content="#000" />
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
