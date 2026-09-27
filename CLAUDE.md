# CLAUDE.md

個人ポートフォリオ兼ブログサイト。Next.js blog-starter をベースに拡張したもの。

## スタック

- Next.js 16 (App Router) / React 19 / TypeScript
- Tailwind CSS v4 (`@tailwindcss/postcss`)
- `output: "export"` の静的サイト → `out/` を Firebase Hosting にデプロイ
- パッケージマネージャ: pnpm。npm / yarn は使わない
  - pnpm の `minimumReleaseAge`（公開から 1 日未満のバージョンは入れない）はサプライチェーン対策なので、除外設定を足して回避しない

## TypeScript

- `typescript` は 6 系（Next.js と typescript-eslint が使う）。7 系は typescript-eslint が未対応のため上げない
- 型チェックの高速化用に `@typescript/native-preview`（tsgo）を併用している

## コマンド

- `pnpm dev` — 開発サーバー
- `pnpm build` — 静的ビルド（`out/` に出力）。変更後の動作確認はまずこれ
- `pnpm lint` — ESLint
- `pnpm typecheck` — tsgo（TypeScript 7 ネイティブ版）による高速な型チェック

## 構成

- `_posts/*.md` — ブログ記事（front matter は `gray-matter`、本文は `zenn-markdown-html` で変換）
- `src/app/` — ルーティング（`/`, `/about`, `/posts`, `/posts/[slug]`）
- `src/components/layout/` — レイアウトコンポーネント
- `src/components/post/` — 記事関連コンポーネント
- `src/components/tag/` — タグ関連コンポーネント
- `src/lib/posts.ts` — 記事の読み込み・一覧・タグ取得（モジュールレベルでキャッシュ）
- `src/lib/external-posts.ts` — Zenn (API) / Qiita (API) からの外部記事取得（ビルド時に取得・検証）
- `src/lib/markdown.ts` — Markdown → HTML
- `src/lib/profile.ts` — プロフィール情報（About ページ用）
- `src/lib/site.ts` — サイト共通定数
- `src/lib/topics.ts` — カテゴリ・トピックの定義および slug 生成などの正規化処理
- `src/types/post.ts` — Post 型・front matter の Zod スキーマ
- 記事は 1 つのカテゴリ（Blog / Zenn / Qiita。ブログ記事は常に Blog、外部記事は書いた場所）と 0 個以上のトピック（技術・話題のタグ。表示名は空白なし）を持つ
- `draft: true` の記事は下書きとして扱い、本番ビルドから除外（`pnpm dev` または `SHOW_DRAFTS=true` で表示）

## デプロイ

- `main` への push で GitHub Actions が Firebase Hosting (live) にデプロイ
- PR ではプレビューチャンネルにデプロイ
- 静的エクスポートなので、サーバー機能（API Routes、動的 SSR、`next/image` 最適化など）は使えない

## 作業の進め方（Claude 向け）

共通の進め方（agy への委譲、確認手順、Git 運用）は `~/.claude/CLAUDE.md` に書いてある。このリポジトリ固有の点だけ以下に書く。

- 確認は `pnpm build` / `pnpm lint` / `pnpm typecheck` の 3 つ
- コミットの type は Conventional Commits の `feat` / `fix` / `refactor` / `docs` / `style` / `chore` に加え、記事の追加は `post`
- PR を作る・push するたびに Firebase のプレビューチャンネルにデプロイされる（URL は PR にコメントされ、7 日で失効）。見た目の確認はそこで行う
