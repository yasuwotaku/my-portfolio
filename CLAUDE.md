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
- `src/app/` — ルーティング（`/`, `/about`, `/posts`, `/posts/[slug]`, `/tags`, `/tags/[slug]`）
- `src/components/layout/` — レイアウトコンポーネント
- `src/components/post/` — 記事関連コンポーネント
- `src/components/tag/` — タグ関連コンポーネント
- `src/lib/posts.ts` — 記事の読み込み・一覧・タグ取得（モジュールレベルでキャッシュ）
- `src/lib/external-posts.ts` — Zenn (API) / Qiita (API) からの外部記事取得（ビルド時に取得・検証）
- `src/lib/markdown.ts` — Markdown → HTML
- `src/lib/site.ts` — サイト共通定数
- `src/lib/topics.ts` — カテゴリ・トピックの定義および slug 生成などの正規化処理
- `src/types/post.ts` — Post 型・front matter の Zod スキーマ
- 記事は 1 つのカテゴリ（Blog / Tech / Zenn / Qiita）と 0 個以上のトピック（技術・話題のタグ）を持つ

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
   - 「サブエージェントやバックグラウンドタスクは使わず直接作業する」も必ず含める（使うと完了を待ったままタイムアウトすることがある）
   - 続きの指示は `-c`（直前の会話を継続）を使う
3. Claude が `git diff` と `pnpm build` / `pnpm lint` で結果を確認し、問題があれば修正指示を再度 `agy` に投げる
4. ユーザーに結果を報告する

### 方針

- 小さな修正（数行程度）や、委譲の方が手間になるものは Claude が直接やってよい
- 文章（README や UI 文言）は絵文字を使わず簡潔に。AI っぽい冗長な説明は避ける

## Git 運用

- 作業ごとに `main` からブランチを切る。命名は [Conventional Branch](https://conventional-branch.github.io/) に従う: `<type>/<説明>`（小文字・ハイフン区切り）
  - `feature/` 機能追加、`bugfix/` バグ修正、`hotfix/` 緊急修正、`release/` リリース準備、`chore/` それ以外（リファクタリング、ドキュメント、依存更新など）
  - 例: `feature/about-page`, `bugfix/tag-link`, `chore/update-readme`
- コミットメッセージは Conventional Commits 形式、説明は日本語（例: `feat: About ページを追加`）
  - type: `feat` / `fix` / `refactor` / `docs` / `style` / `chore`、記事の追加は `post`
  - Claude（agy 経由の作業も含む）がコミットするときは、末尾に `Co-Authored-By: Claude <noreply@anthropic.com>` 形式の trailer を必ず付ける
- ブランチ・コミット・push・PR 作成までは Claude が行う（git 操作は agy にやらせない）
- PR は squash merge。マージはユーザーが行う
- PR を作る・push するたびに Firebase のプレビューチャンネルにデプロイされる（URL は PR にコメントされ、7 日で失効）。見た目の確認はそこで行う
