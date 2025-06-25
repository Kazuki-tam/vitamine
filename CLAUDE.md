# Vitamin Template - AI開発ガイド

## プロジェクト概要
このプロジェクトは、LP・小規模サイト制作用のViteベーステンプレートです。
FLOCSSに基づいたCSS設計とTypeScriptを採用し、デザイナーがAI駆動開発で効率的に開発を進められるよう設計されています。

## 技術スタック
- **ビルドツール**: Vite
- **言語**: TypeScript
- **スタイリング**: Pure CSS (FLOCSS設計)
- **パッケージマネージャー**: bun

## コマンド
```bash
# 開発サーバー起動
bun run dev

# ビルド
bun run build

# 型チェック
bun run typecheck

# リント実行
bun run lint
bun run lint:css

# フォーマット
bun run format
```

## ディレクトリ構造とFLOCSS
```
src/styles/
├── foundation/   # 基本設定
│   ├── _variables.css  # CSS変数定義
│   ├── _reset.css      # リセットCSS
│   └── _base.css       # ベーススタイル
├── layout/       # レイアウト (l-*)
│   ├── _header.css
│   ├── _main.css
│   └── _footer.css
├── object/
│   ├── component/  # 再利用可能部品 (c-*)
│   │   ├── _button.css
│   │   └── _card.css
│   ├── project/    # プロジェクト固有 (p-*)
│   │   └── _hero.css
│   └── utility/    # 汎用クラス (u-*)
│       └── _utility.css
└── style.css      # インポート管理
```

## 命名規則
- Layout: `l-*` (例: `l-header`, `l-container`)
- Component: `c-*` (例: `c-button`, `c-card`)
- Project: `p-*` (例: `p-hero`, `p-contact`)
- Utility: `u-*` (例: `u-text-center`, `u-mt-lg`)

## 新しいページの追加方法
1. HTMLファイルを作成
2. vite.config.tsのrollupOptions.inputに追加
3. 必要に応じてproject/にページ専用スタイルを追加

## 注意事項
- CSS変数は_variables.cssで一元管理
- レスポンシブ対応はモバイルファーストで実装
- 画像は自動最適化される（vite-plugin-imagemin）