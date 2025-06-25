export interface SimplePageConfig {
  title: string;
  description: string;
  ogDescription?: string;
}

export interface FullPageConfig {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  path: string;
  cssPath: string;
  jsPath: string;
}

export interface GlobalConfig {
  siteName: string;
  baseUrl: string;
  ogImage: string;
}

export const globalConfig: GlobalConfig = {
  siteName: 'Vitamin Template',
  baseUrl: 'https://yoursite.com',
  ogImage: '/og-image.png',
};

// 超シンプルな設定
export const simplePageConfigs: Record<string, SimplePageConfig> = {
  '/index.html': {
    title: 'Vitamin Template',
    description: 'サイトの説明文',
    ogDescription: 'シンプルで使いやすいWeb制作テンプレート',
  },
  // 新しいページの追加例（超シンプル）:
  // '/contact/index.html': {
  //   title: 'Contact',
  //   description: 'お問い合わせページ',
  // },
};

/**
 * パスから相対パスを自動生成
 */
function generateRelativePaths(pagePath: string): {
  cssPath: string;
  jsPath: string;
  urlPath: string;
} {
  if (pagePath === '/index.html') {
    return {
      cssPath: './style.css',
      jsPath: './main.ts',
      urlPath: '/',
    };
  }

  // サブディレクトリのページの場合
  const depth = (pagePath.match(/\//g) || []).length - 1;
  const prefix = '../'.repeat(depth);

  const urlPath = pagePath.replace('/index.html', '/');

  return {
    cssPath: `${prefix}style.css`,
    jsPath: `${prefix}main.ts`,
    urlPath,
  };
}

/**
 * 簡易設定から完全な設定を生成
 */
function expandPageConfig(pagePath: string, simpleConfig: SimplePageConfig): FullPageConfig {
  const { cssPath, jsPath, urlPath } = generateRelativePaths(pagePath);

  // タイトルからOGタイトルを自動生成（サイト名を含まない場合は追加）
  const ogTitle = simpleConfig.title.includes(globalConfig.siteName)
    ? simpleConfig.title
    : `${simpleConfig.title} - ${globalConfig.siteName}`;

  return {
    title: simpleConfig.title,
    description: simpleConfig.description,
    ogTitle,
    ogDescription: simpleConfig.ogDescription || simpleConfig.description,
    path: urlPath,
    cssPath,
    jsPath,
  };
}

/**
 * 新しいページを簡単に追加
 * @param pagePath - ページパス（例: '/contact/index.html'）
 * @param config - 簡易設定
 */
export function addPage(pagePath: string, config: SimplePageConfig): void {
  simplePageConfigs[pagePath] = config;
}

/**
 * ページ設定を取得（自動拡張）
 * @param pagePath - ページパス
 * @returns 完全なページ設定（存在しない場合はundefined）
 */
export function getPageConfig(pagePath: string): FullPageConfig | undefined {
  const simpleConfig = simplePageConfigs[pagePath];
  if (!simpleConfig) return undefined;

  return expandPageConfig(pagePath, simpleConfig);
}

/**
 * 全ページの設定を取得
 */
export function getAllPageConfigs(): Record<string, FullPageConfig> {
  const result: Record<string, FullPageConfig> = {};

  for (const [pagePath, simpleConfig] of Object.entries(simplePageConfigs)) {
    result[pagePath] = expandPageConfig(pagePath, simpleConfig);
  }

  return result;
}
