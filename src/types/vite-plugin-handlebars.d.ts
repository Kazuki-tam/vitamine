declare module 'vite-plugin-handlebars' {
  interface HandlebarsConfig {
    partialDirectory?: string;
    context?: Record<string, any> | ((pagePath: string) => Record<string, any>);
  }

  function handlebars(config?: HandlebarsConfig): any;
  export default handlebars;
}
