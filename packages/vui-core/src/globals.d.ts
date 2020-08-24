import Vue, { VueConstructor } from 'vue';

declare global {
  interface Window {
    Vue: VueConstructor;
  }

  interface Node {
    autoUpdate?: boolean;
    new (...args: any): any;
  }

  interface HTMLElement {
    _clickOutside?: EventListenerOrEventListenerObject;
    __transferDomData: {
      parentNode: Node;
      home: Comment;
      target: HTMLElement;
      hasMovedOut: boolean;
    } | null;
  }

  function isNaN(string: string | number): boolean;
  function parseInt(string: string | number, radix?: number): number;
  function parseFloat(string: string | number): number;

  export type Dictionary<T> = Record<string, T>;

  export const __VUI_VERSION__: string;
  export const __REQUIRED_VUE__: string;
}

declare module 'vue/types/vue' {
  interface VueConstructor<V extends Vue = Vue, Options = Record<string, any>> {
    $__vui_installed__?: true;
    options: Options;
  }
}
