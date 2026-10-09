import { getAllPosts } from "@/lib/posts";
import { SITE_URL } from "@/lib/site";
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
	const posts = getAllPosts().filter((post) => !post.draft);
	const postRoutes = posts.map((post) => ({
		url: `${SITE_URL}/posts/${post.slug}`,
		lastModified: new Date(post.date).toISOString().split("T")[0],
	}));

	const routes = ["", "/about", "/posts"].map((route) => ({
		url: `${SITE_URL}${route}`,
		lastModified: new Date().toISOString().split("T")[0],
	}));

	return [...routes, ...postRoutes];
}
