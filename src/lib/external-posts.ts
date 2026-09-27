import {
	ExternalPostItem,
	externalPostItemSchema,
	qiitaResponseSchema,
	zennArticleDetailSchema,
	zennArticlesResponseSchema,
} from "@/types/post";

export function normalizeZennDate(publishedAt: string): string {
	if (publishedAt.endsWith("+09:00")) {
		return publishedAt.replace(/\+09:00$/, "");
	}
	const date = new Date(publishedAt);
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

async function fetchZennTopics(slug: string): Promise<string[]> {
	try {
		const res = await fetch(`https://zenn.dev/api/articles/${slug}`);
		if (!res.ok) {
			console.warn(
				`[Zenn] Failed to fetch topics for ${slug}: HTTP ${res.status}`
			);
			return [];
		}
		const data = await res.json();
		const validationResult = zennArticleDetailSchema.safeParse(data);
		if (!validationResult.success) {
			console.warn(
				`[Zenn] Validation failed for topics of ${slug}: ${validationResult.error.message}`
			);
			return [];
		}
		return validationResult.data.article.topics.map((t) => t.display_name);
	} catch (error) {
		console.warn(`[Zenn] Failed to fetch topics for ${slug}:`, error);
		return [];
	}
}

async function fetchZennPosts(): Promise<ExternalPostItem[]> {
	try {
		const res = await fetch(
			"https://zenn.dev/api/articles?username=yasuwotaku&order=latest"
		);
		if (!res.ok) {
			throw new Error(`HTTP error ${res.status}: ${res.statusText}`);
		}
		const data = await res.json();
		const validationResult = zennArticlesResponseSchema.safeParse(data);
		if (!validationResult.success) {
			throw new Error(`Validation failed: ${validationResult.error.message}`);
		}

		const rawArticles = validationResult.data.articles;
		const items: ExternalPostItem[] = await Promise.all(
			rawArticles.map(async (rawItem) => {
				const topics = await fetchZennTopics(rawItem.slug);
				const candidate: ExternalPostItem = {
					kind: "external",
					source: "zenn",
					url: `https://zenn.dev${rawItem.path}`,
					title: rawItem.title,
					date: normalizeZennDate(rawItem.published_at),
					tags: ["Zenn", ...topics],
				};
				const itemValidation = externalPostItemSchema.safeParse(candidate);
				if (!itemValidation.success) {
					throw new Error(
						`Item validation failed: ${itemValidation.error.message}`
					);
				}
				return itemValidation.data;
			})
		);

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
				tags: ["Qiita", ...rawItem.tags.map((t) => t.name)],
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
