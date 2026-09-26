# CLAUDE.md

個人ポートフォリオ兼ブログサイト。Next.js blog-starter をベースに拡張したもの。

## スタック

- Next.js 15 (App Router) / React 19 / TypeScript
- Tailwind CSS v4 (`@tailwindcss/postcss`)
- `output: "export"` の静的サイト → `out/` を Firebase Hosting にデプロイ
- パッケージマネージャ: Yarn (Berry)。npm / pnpm は使わない

## コマンド

- `yarn dev` — 開発サーバー (turbopack)
- `yarn build` — 静的ビルド（`out/` に出力）。変更後の動作確認はまずこれ
- `yarn lint` — ESLint

## 構成

- `_posts/*.md` — ブログ記事（front matter は `gray-matter`、本文は `zenn-markdown-html` で変換）
- `src/app/` — ルーティング（`/`, `/about`, `/posts`, `/posts/[slug]`, `/tags`, `/tags/[tag]`）
- `src/components/` — UI コンポーネント
- `src/lib/api.ts` — 記事の読み込み・一覧取得
- `src/lib/markdownToHtml.ts` — Markdown → HTML
- `src/interfaces/post.ts` — Post 型

## デプロイ

- `main` への push で GitHub Actions が Firebase Hosting (live) にデプロイ
- PR ではプレビューチャンネルにデプロイ
- 静的エクスポートなので、サーバー機能（API Routes、動的 SSR、`next/image` 最適化など）は使えない

## 作業の進め方（Claude 向け）

コスト節約のため、Claude は **計画・レビュー・ユーザーとのやり取り** に集中し、実装作業は `agy`（Antigravity CLI）経由で Gemini に委譲する。

### 委譲の手順

1. Claude がタスクを小さく分割し、具体的な作業指示（対象ファイル、変更内容、完了条件）を書く
2. `agy` で実行する:
   ```sh
   agy --print-timeout 300s --model gemini-3.8-flash-high --dangerously-skip-permissions -p "<作業指示>"
   ```
   - `-p` は必ず最後に置く（`-p` の直後の引数がプロンプトとして解釈されるため）
   - 長い指示はスクラッチパッドにファイルで書き、`"$(cat path/to/prompt.md)"` で渡す
   - 指示には「git コマンドは実行しない」「対象外のファイルは変更しない」を含める
   - 続きの指示は `-c`（直前の会話を継続）を使う
3. Claude が `git diff` と `yarn build` / `yarn lint` で結果を確認し、問題があれば修正指示を再度 `agy` に投げる
4. ユーザーに結果を報告する

### 方針

- 小さな修正（数行程度）や、委譲の方が手間になるものは Claude が直接やってよい
- 文章（README や UI 文言）は絵文字を使わず簡潔に。AI っぽい冗長な説明は避ける

## Git 運用

- 作業ごとに `main` からブランチを切る。命名は `<type>/<短い説明>`（例: `feat/about-page`, `fix/tag-link`）。type はコミットと同じもの
- コミットメッセージは Conventional Commits 形式、説明は日本語（例: `feat: About ページを追加`）
  - type: `feat` / `fix` / `refactor` / `docs` / `style` / `chore`、記事の追加は `post`
- ブランチ・コミット・push・PR 作成までは Claude が行う（git 操作は agy にやらせない）
- PR は squash merge。マージはユーザーが行う
- PR を作ると Firebase のプレビューチャンネルにデプロイされるので、見た目の確認はそこで行える
