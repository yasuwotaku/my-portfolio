import {
	ExternalPostItem,
	externalPostItemSchema,
	qiitaResponseSchema,
	zennRssSchema,
} from "@/types/post";
import { XMLParser } from "fast-xml-parser";

export function normalizeZennDate(pubDate: string): string {
	const date = new Date(pubDate);
	const jstDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);
	const yyyy = jstDate.getUTCFullYear();
	const mm = String(jstDate.getUTCMonth() + 1).padStart(2, "0");
	const dd = String(jstDate.getUTCDate()).padStart(2, "0");
	const hh = String(jstDate.getUTCHours()).padStart(2, "0");
	const min = String(jstDate.getUTCMinutes()).padStart(2, "0");
	const ss = String(jstDate.getUTCSeconds()).padStart(2, "0");
	return `${yyyy}-${mm}-${dd}T${hh}:${min}:${ss}`;
}

export function normalizeQiitaDate(createdAt: string): string {
	return createdAt.replace(/\+09:00$/, "");
}

async function fetchZennPosts(): Promise<ExternalPostItem[]> {
	try {
		const res = await fetch("https://zenn.dev/yasuwotaku/feed");
		if (!res.ok) {
			throw new Error(`HTTP error ${res.status}: ${res.statusText}`);
		}
		const xml = await res.text();
		const parser = new XMLParser({
			ignoreAttributes: false,
			attributeNamePrefix: "",
			isArray: (name) => name === "item",
		});
		const parsed = parser.parse(xml);
		const validationResult = zennRssSchema.safeParse(parsed);
		if (!validationResult.success) {
			throw new Error(`Validation failed: ${validationResult.error.message}`);
		}

		const rawItems = validationResult.data.rss.channel.item ?? [];
		const items: ExternalPostItem[] = [];

		for (const rawItem of rawItems) {
			const candidate: ExternalPostItem = {
				kind: "external",
				source: "zenn",
				url: rawItem.link,
				title: rawItem.title,
				date: normalizeZennDate(rawItem.pubDate),
				tags: ["Zenn"],
			};
			const itemValidation = externalPostItemSchema.safeParse(candidate);
			if (!itemValidation.success) {
				throw new Error(
					`Item validation failed: ${itemValidation.error.message}`
				);
			}
			items.push(itemValidation.data);
		}

		return items;
	} catch (error) {
		console.warn(`[Zenn] Failed to fetch external posts:`, error);
		return [];
	}
}

async function fetchQiitaPosts(): Promise<ExternalPostItem[]> {
	try {
		const res = await fetch(
			"https://qiita.com/api/v2/users/yasuwotaku/items?per_page=100"
		);
		if (!res.ok) {
			throw new Error(`HTTP error ${res.status}: ${res.statusText}`);
		}
		const data = await res.json();
		const validationResult = qiitaResponseSchema.safeParse(data);
		if (!validationResult.success) {
			throw new Error(`Validation failed: ${validationResult.error.message}`);
		}

		const rawItems = validationResult.data;
		const items: ExternalPostItem[] = [];
		for (const rawItem of rawItems) {
			const candidate: ExternalPostItem = {
				kind: "external",
				source: "qiita",
				url: rawItem.url,
				title: rawItem.title,
				date: normalizeQiitaDate(rawItem.created_at),
				tags: ["Qiita"],
			};
			const itemValidation = externalPostItemSchema.safeParse(candidate);
			if (!itemValidation.success) {
				throw new Error(
					`Item validation failed: ${itemValidation.error.message}`
				);
			}
			items.push(itemValidation.data);
		}

		return items;
	} catch (error) {
		console.warn(`[Qiita] Failed to fetch external posts:`, error);
		return [];
	}
}

let externalPostsPromise: Promise<ExternalPostItem[]> | null = null;

async function fetchAllExternalPosts(): Promise<ExternalPostItem[]> {
	const [zennPosts, qiitaPosts] = await Promise.all([
		fetchZennPosts(),
		fetchQiitaPosts(),
	]);
	return [...zennPosts, ...qiitaPosts];
}

export function getExternalPosts(): Promise<ExternalPostItem[]> {
	if (!externalPostsPromise) {
		externalPostsPromise = fetchAllExternalPosts();
	}
	return externalPostsPromise;
}
