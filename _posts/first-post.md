---
title: "ブログを Next.js で構築しました"
excerpt: "Next.js を活用したブログ構築の記録"
coverImage:
    url: "/assets/blog/first-post/cover.jpg"
    alt: ""
date: "2025-03-09T21:29:07"
ogImage:
    url: "/assets/blog/first-post/cover.jpg"
tags:
    - "Blog"
---

継続的なアウトプットの習慣を作る手始めとして、ブログを作成しました。この投稿では、構成などについて軽く紹介していきます。

## 自己紹介

都内で Android エンジニアとして働いている yasuwotaku と申します。現在、エンジニアとしてのキャリアは3年目です。

https://x.com/yasuwotaku

(あんまり使っていない)

https://github.com/yasuwotaku

(個人アカウントの方に全然草が生えてなくてちょっとさみしい)

普段は Kotlin や Jetpack Compose を用いた Android アプリの開発と、Android チームのリードをしています。Androidアプリ開発を主軸としていますが、アウトプットの場としてブログの立ち上げを期に、Web フロントエンドの学習にも挑戦することにしました。

## 方針

今回のブログ構築にあたっては、最初に以下の方針を定めました。

1.  **テンプレートの活用:** Web フロントエンドの開発経験が少ないため、フルスクラッチではなく、既存のテンプレートをベースにカスタマイズしていく形で開発を進めました。短期間でのブログ立ち上げと、アウトプットの早期開始を目指しました。

2.  **完成優先:** 細部にこだわりすぎて完成が遅れることが自分は多々あるので、まずはブログとしての最低限の機能を備えた状態で完成させ、公開することを優先しました。細部の調整や機能追加は、公開後に継続的に行うこととします。

## 参考

このブログの構築にあたり、以下の記事を参考にさせていただきました。

https://zenn.dev/miketako3/articles/9b2b1a9ec13901

Vercelのblog-starter-kitをベースに、カスタマイズや公開手順が紹介されています。

https://vercel.com/templates/next.js/blog-starter-kit

公開時期が少し前なのもあって、そのままでは動かないところは適宜調べながら進めていきましたが、ほとんどこちらの記事のとおりに進めていくだけで、あっという間に土台が完成しました。

## 構成

ざっくり構成を紹介します。ほとんど元記事そのままです。

- フレームワーク: **Next.js + Tailwind CSS**
- ホスティング: **Firebase Hosting**
- CD: **GitHub Actions**
- 他: **zenn-markdown-html**

また、UIキットを使ったらもっと楽かなと思い、途中まで **Material Tailwind** の利用を前提に進めていました。しかし、慣れていないのもあって Tailwind CSS や Next の機能との使い分けに苦慮し、結局 UI キットは使わずにシンプルな構成で進めることにしました。

https://www.material-tailwind.com/

ただ組み合わせで色々作れるのは非常に楽ですね。ドロワーなども簡単に実装できます。管理画面とかに良さそう。

## 引っかかったところ

開発の過程で引っかかったところをメモしておきます。
他にも eslint の設定とかめちゃくちゃ詰まりましたが、いつかまとめていい感じにして記事にしたいですね。

### next/link を使おう

next/link を使った場合と aタグを使った場合で、遷移時のページのロードの仕方が違います。

- aタグ: 遷移時に都度ロードして描画する
- Link: 前もって遷移先のデータをロードしてくれるので遷移が高速になる

この違いを知らずに、Material Tailwind の Typography に aタグを持たせて遷移させていたのですが、aタグで遷移する場合は前の画面の状態をを持ち回してくれませんでした。また、Typography と Link の組み合わせがどうしてもエラーになってしまいなかなか解消できなかったこともあって、Material Tailwind の利用は一旦やめました。
また以前はSEO対策のために Link の中に aタグを入れる場合もあったみたいですが、v13 以降のNextではLink を使えばいいみたいですね。

### Androidでの表示

公開後、確認しやすいようにスマホ側でこのサイトをホーム画面に追加しましたが、黒背景に白くて四角いアイコンが浮いていてスプラッシュ画面があんまりいい感じになっていませんでした。

![](/assets/blog/first-post/screenshot_before.png =250x)

(消える直前でスクショしたので半透明になってます。)

どうやら site.webmanifest でその辺の設定があるらしいです。みたところ、background_color と theme_color に #000 が指定されていました。
アイコンが浮かないように背景は白にしたいので、background_color を修正します。

```json:site.webmanifest
{
	"name": "yasuworks.com",
	"short_name": "yasuworks.com",
	"icons": [
		{
			"src": "/favicons/android-chrome-192x192.png",
			"sizes": "192x192",
			"type": "image/png"
		},
		{
			"src": "/favicons/android-chrome-512x512.png",
			"sizes": "512x512",
			"type": "image/png"
		}
	],
	"theme_color": "#FFFFFF",
	"background_color": "#FFFFFF",
	"display": "standalone"
}
```

無事、いい感じにできました。

![](/assets/blog/first-post/screenshot_after.png =250x)

## 今後

いろいろな記事を参考にしながら寄せ集めたコードで、一旦なんとかいい感じの見た目になるまでこぎつけましたが、Aboutページやタグ一覧ページなどまだ作っていない画面も多いのが現状です。ブログの投稿と並行して、コツコツ進めていこうと思います。

にしても、結局サイトのデザインに一番時間がかかりましたね。コードを書いている時間より、他のサイトを眺めている時間のほうが多かった気さえします。この辺デザイナーの方はサクサク作っているのだろうか。いくつか作りたいサイトもあるので、簡単にデザインができるツールを見つけたり、サイトデザインの引き出しを増やしておかないとなあと思います。
