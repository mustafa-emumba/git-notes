export function ensureMonacoEnvironment(): void {
  (window as any).MonacoEnvironment = {
    getWorkerUrl: () =>
      `data:text/javascript;charset=utf-8,${encodeURIComponent(`
        self.MonacoEnvironment = {
          baseUrl: 'https://unpkg.com/monaco-editor@0.50.0/min/'
        };
        importScripts('https://unpkg.com/monaco-editor@0.50.0/min/vs/base/worker/workerMain.js');
      `)}`,
  };
}
