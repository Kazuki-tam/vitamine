# Vitamin Template

LP・小規模サイト制作用のモダンなViteベーステンプレート

## 🚀 特徴

- **Vite** - 高速な開発環境とビルド
- **TypeScript** - 型安全な開発
- **FLOCSS設計** - 保守性の高いCSS設計
- **マルチページ対応** - 複数ページのサイト構築に対応
- **画像自動最適化** - ビルド時に自動で画像を最適化

## 📦 必要環境

- Node.js 22以上
- [bun](https://bun.sh/) (推奨パッケージマネージャー)

## 🛠️ セットアップ

```bash
# リポジトリのクローン
git clone [your-repo-url]
cd vitamin

# 依存関係のインストール
bun install

# 開発サーバーの起動
bun run dev
```

## 📝 利用可能なコマンド

| コマンド | 説明 |
|---------|------|
| `bun run dev` | 開発サーバーを起動 |
| `bun run build` | プロダクションビルド |
| `bun run preview` | ビルド結果のプレビュー |
| `bun run typecheck` | TypeScriptの型チェック |
| `bun run lint` | コードのリント（自動修正付き） |
| `bun run lint:markup` | HTMLの構文チェック |
| `bun run format` | コードのフォーマット |
| `bun run check` | 全チェックの統合実行 |
| `bun run audit` | 依存関係の更新チェック |

## 📁 プロジェクト構造

```
vitamin/
├── src/
│   ├── index.html          # メインページ
│   ├── main.ts            # TypeScriptエントリーポイント
│   ├── style.css          # メインCSS（FLOCSS構造）
│   └── styles/
│       ├── foundation/    # リセット・変数・ベーススタイル
│       ├── layout/        # レイアウトコンポーネント
│       └── object/        # UIコンポーネント
│           ├── component/ # 再利用可能な小さなコンポーネント
│           ├── project/   # ページ固有のコンポーネント
│           └── utility/   # ユーティリティクラス
├── public/                # 静的ファイル
├── vite.config.ts        # Vite設定
└── package.json
```

## 🎨 CSS設計（FLOCSS）

本プロジェクトはFLOCSS設計を採用しています：

- **Foundation**: リセットCSS、CSS変数、ベーススタイル
- **Layout** (`l-*`): ヘッダー、フッター、メイン構造
- **Object/Component** (`c-*`): 再利用可能なUIパーツ
- **Object/Project** (`p-*`): 特定ページ専用のスタイル
- **Object/Utility** (`u-*`): マージン、パディング等のヘルパー

## 📄 新規ページの追加

1. `src/`ディレクトリに新しいHTMLファイルを作成
2. `vite.config.ts`の`rollupOptions.input`に追加：

```typescript
input: {
  main: resolve(__dirname, 'src/index.html'),
  about: resolve(__dirname, 'src/about.html'), // 新規追加
}
```

3. 必要に応じてページ専用スタイルを`styles/object/project/`に追加

## 🔧 カスタマイズ

### デザイントークン

`src/styles/foundation/_variables.css`でカラーパレット、フォント、スペーシングなどのデザイントークンを管理：

```css
:root {
  /* カラー */
  --color-primary: #FFA500;
  --color-secondary: #FF6347;
  
  /* タイポグラフィ */
  --font-family-base: 'Noto Sans JP', sans-serif;
  
  /* スペーシング */
  --spacing-unit: 0.5rem;
}
```

### 画像最適化設定

`vite.config.ts`で画像最適化の品質を調整可能：

```typescript
ViteImageOptimizer({
  png: { quality: 90 },
  jpeg: { quality: 80 },
  jpg: { quality: 80 },
  webp: { lossless: true },
})
```

## 📚 関連ドキュメント

- [Vite公式ドキュメント](https://vitejs.dev/)
- [FLOCSS設計について](https://github.com/hiloki/flocss)
- [TypeScript公式ドキュメント](https://www.typescriptlang.org/)

## 📝 ライセンス

MIT License

---

Add Vitamin to your dev life! 🍊