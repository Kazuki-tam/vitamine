# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Vitamin Template - AI開発ガイド

## プロジェクト概要
LP・小規模サイト制作用のViteベーステンプレート。FLOCSSに基づいたCSS設計とTypeScriptを採用し、マルチページ対応と画像最適化機能を備えています。

## 技術アーキテクチャ
- **ビルドツール**: Vite（マルチページ設定）
- **言語**: TypeScript
- **スタイリング**: Pure CSS (FLOCSS設計)
- **パッケージマネージャー**: bun
- **ソースルート**: `./src`ディレクトリ

## コマンド
```bash
# 開発サーバー起動
bun run dev

# プロダクションビルド（TypeScriptコンパイル含む）
bun run build

# 型チェックのみ
bun run typecheck

# リント・フォーマット
bun run lint           # Biome自動修正付き
bun run lint:markup    # HTML構文チェック（Markuplint）
bun run format         # Biomeフォーマッター
bun run check          # 全チェック統合実行

# メンテナンス
bun run audit          # 依存関係更新
```

## FLOCSS CSS設計
CSSファイルは`src/style.css`経由で階層的にインポート：

1. **Foundation**: リセット、変数、ベーススタイル
2. **Layout** (`l-*`): サイト構造コンポーネント
3. **Object/Component** (`c-*`): 再利用可能UIコンポーネント
4. **Object/Project** (`p-*`): ページ固有コンポーネント
5. **Object/Utility** (`u-*`): ヘルパークラス・状態管理

すべてのスタイルは`_variables.css`で定義されたCSS変数を使用。

## マルチページ設定
`vite.config.ts`の`rollupOptions.input`でページを設定。各ページは：
- `src/`内に独自のHTMLファイル
- `styles/object/project/`に専用CSS（必要に応じて）
- 共通のTypeScriptエントリーポイント（`main.ts`）を使用

## コーディング規約
- **TypeScript**: strict mode
- **CSS**: 2スペースインデント、100文字行幅
- **HTML**: Markuplint（アクセシビリティ重視）でバリデーション
- **フォーマット**: Biome（シングルクォート、セミコロン、末尾カンマ）

## 画像最適化
ViteImageOptimizerプラグインによる自動最適化：
- PNG: 90%品質
- JPEG/JPG: 80%品質
- WebP: ロスレス圧縮
- SVG: viewBoxと属性を保持

## Figma MCPサーバー連携
Figma Dev Mode MCPサーバーを活用してデザインデータの効率的な取得を行う：

### セットアップ
- Figmaデスクトップアプリで MCPサーバー有効化
- Cursorで MCPクライアント設定: `http://127.0.0.1:3845/sse`

### ワークフロー
- **選択ベース**: Figmaでフレーム選択 → AI実装指示
- **リンクベース**: Figmaリンクコピー → AI実装指示
- デザイントークンとCSS変数の自動対応
- FLOCSS階層への適切な配置判断
- **レスポンシブ対応**: モバイルファーストでの段階的実装

## 新規ページ追加手順
1. **Figmaデザイン確認**: MCPサーバー経由でデザイン取得
2. `src/`にHTMLファイル作成
3. `vite.config.ts`の`rollupOptions.input`に追加
4. 必要に応じて`styles/object/project/`に専用スタイル追加（FLOCSS準拠）
5. `src/style.css`に専用スタイルをインポート

## Gitワークフロー
プロジェクトではGitワークフローを採用：
- **main**: 本番環境用安定版
- **develop**: 開発統合ブランチ
- **feature/[機能名]**: 新機能開発用
- **fix/[修正内容]**: バグ修正用

コミットメッセージは`<type>(<scope>): <subject>`形式を使用（例: `feat(hero): ヒーローセクション追加`）