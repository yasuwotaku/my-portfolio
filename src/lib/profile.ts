export type ProfileLink = {
	service: "github" | "x" | "zenn" | "qiita";
	label: string;
	url: string;
};

export type TimelineItem = {
	period: string;
	description: string;
};

export type SkillGroup = {
	name: string;
	skills: string[];
};

export type HobbyPhoto = {
	src: string;
	alt: string;
};

export type Hobby = {
	name: string;
	description?: string;
	link?: {
		href: string;
		label: string;
	};
	photos?: HobbyPhoto[];
};

export type Profile = {
	name: string;
	handle: string;
	icon: string;
	bio: string;
	links: ProfileLink[];
	timeline: TimelineItem[];
	skills: SkillGroup[];
	hobbies: Hobby[];
};

export const PROFILE: Profile = {
	name: "Takumi Yasuda / ヤスヲ",
	handle: "yasuwotaku",
	icon: "/assets/profile/icon.jpg",
	bio: "千葉県南房総市出身、都内在住。Android アプリを作っています。この世のすべてに興味があります。",
	links: [
		{
			service: "github",
			label: "GitHub",
			url: "https://github.com/yasuwotaku",
		},
		{
			service: "x",
			label: "X",
			url: "https://x.com/yasuwotaku",
		},
		{
			service: "zenn",
			label: "Zenn",
			url: "https://zenn.dev/yasuwotaku",
		},
		{
			service: "qiita",
			label: "Qiita",
			url: "https://qiita.com/yasuwotaku",
		},
	],
	timeline: [
		{ period: "2013", description: "木更津工業高等専門学校 情報工学科 入学" },
		{ period: "2018", description: "同 専攻科 制御・情報システム工学専攻 入学" },
		{ period: "2020", description: "筑波大学大学院 サービス工学学位プログラム 入学" },
		{ period: "2022", description: "社会進出" },
	],
	skills: [
		{
			name: "Android",
			skills: ["Kotlin", "Jetpack Compose", "Coroutines / Flow", "Android View"],
		},
		{
			name: "Web",
			skills: ["TypeScript", "Next.js", "Tailwind CSS"],
		},
		{
			name: "Server",
			skills: ["Go", "Python", "MySQL", "AWS"],
		},
		{
			name: "Others",
			skills: ["GitHub Actions", "BigQuery", "Google Apps Script"],
		},
	],
	hobbies: [
		{
			name: "カメラ",
			description: "SONY α7C II と、7 年使っている RX10。",
			link: { href: "/posts/bought-a-camera", label: "カメラを買った話" },
			photos: [
				{ src: "/assets/album/DSC00001.JPG", alt: "DSC00001" },
				{ src: "/assets/album/DSC00007.JPG", alt: "DSC00007" },
				{ src: "/assets/album/DSC00009.JPG", alt: "DSC00009" },
			],
		},
		{
			name: "映画",
			description: "クリストファー・ノーランが好き。マーベル作品も追える範囲で追っています。",
		},
		{ name: "読書" },
		{ name: "アニメ" },
		{ name: "漫画", description: "週刊少年ジャンプを購読中。" },
		{ name: "YouTube" },
		{ name: "料理" },
		{ name: "開発" },
	],
};
