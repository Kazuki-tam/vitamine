declare module 'vite-plugin-handlebars' {
  import type { Plugin } from 'vite';

  interface HandlebarsConfig {
    partialDirectory?: string;
    context?: Record<string, unknown> | ((pagePath: string) => Record<string, unknown>);
  }

  function handlebars(config?: HandlebarsConfig): Plugin;
  export default handlebars;
}
