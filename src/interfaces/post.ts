export type Post = {
	slug: string;
	title: string;
	date: string;
	coverImage: {
		url: string;
		alt: string;
	};
	excerpt: string;
	ogImage: {
		url: string;
	};
	content: string;
	tags: string[];
	preview?: boolean;
};
