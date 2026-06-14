/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'bootstrap' {
  export class Modal {
    constructor(element: HTMLElement | string, options?: any);
    show(): void;
    hide(): void;
    dispose(): void;
  }
}
