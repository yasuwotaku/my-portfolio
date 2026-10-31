# yasuworks.com

yasuwotaku の個人サイト兼ブログ（ https://yasuworks.com ）のソースコード。

## 技術スタック

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- zenn-markdown-html / gray-matter
- Cloudflare Workers (static assets)
- pnpm

## 開発コマンド

```bash
pnpm install   # 依存関係のインストール
pnpm dev       # 開発サーバー起動
pnpm build     # 静的ビルド（out/ に出力）
pnpm lint      # リント
pnpm typecheck # 型チェック（tsgo）
```

## 記事の追加

`_posts/<slug>.md` を作成する。画像は `public/assets/blog/<slug>/` に配置。
`draft: true` を指定した記事は本番ビルドから除外され、`pnpm dev` や PR のプレビュー環境でのみ表示されます。
`featured: true` の記事（複数あれば最新）が Home の先頭に大きく表示される。

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
topics:
  - "Next.js"
draft: false
featured: false
---
```

## デプロイ

`output: "export"` により静的サイトとして `out/` に出力し、Cloudflare Workers (static assets) にデプロイ。
GitHub Actions により、`main` への push で本番環境、PR でプレビュー URL（`pr-<番号>` エイリアス。PR にコメントされ、失効しない）に自動デプロイされる。Zenn や Qiita の記事はビルド時に取得するので、新しい記事を反映するときは Actions の「Deploy」を手動実行する（`gh workflow run deploy.yml`）。

デプロイには GitHub Secrets に `CLOUDFLARE_API_TOKEN` と `CLOUDFLARE_ACCOUNT_ID` の設定が必要です。
