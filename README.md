# yasuworks.com

yasuwotaku の個人サイト兼ブログ（ https://yasuworks.com ）のソースコード。

## 技術スタック

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- zenn-markdown-html / gray-matter
- Firebase Hosting
- Yarn

## 開発コマンド

```bash
yarn install  # 依存関係のインストール
yarn dev      # 開発サーバー起動
yarn build    # 静的ビルド（out/ に出力）
yarn lint     # リント
```

## 記事の追加

`_posts/<slug>.md` を作成する。画像は `public/assets/blog/<slug>/` に配置。

front matter 例:

```yaml
---
title: "記事タイトル"
excerpt: "記事の要約"
coverImage:
  url: "/assets/blog/<slug>/cover.jpg"
  alt: ""
date: "2025-01-01T00:00:00"
ogImage:
  url: "/assets/blog/<slug>/cover.jpg"
tags:
  - "Blog"
---
```

## デプロイ

`output: "export"` により静的サイトとして `out/` に出力し、Firebase Hosting にデプロイ。
GitHub Actions により、`main` への push で本番環境（live）、PR でプレビューチャンネルに自動デプロイされる。
