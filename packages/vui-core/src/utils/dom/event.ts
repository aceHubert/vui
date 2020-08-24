import Vue from 'vue';

const isServer = Vue.prototype.$isServer;

/* istanbul ignore next */
export const on = (function () {
  if (!isServer && document.addEventListener) {
    return function (el: HTMLElement | (Window & typeof globalThis), event: string, handler: EventListener) {
      if (el && event && handler) {
        el.addEventListener(event, handler, false);
      }
      return el;
    };
  } else {
    return function (el: HTMLElement | (Window & typeof globalThis), event: string, handler: EventListener) {
      if (el && event && handler) {
        (el as any).attachEvent('on' + event, handler);
      }
      return el;
    };
  }
})();

/* istanbul ignore next */
export const off = (function () {
  if (!isServer && document.removeEventListener) {
    return function (el: HTMLElement | (Window & typeof globalThis), event: string, handler: EventListener) {
      if (el && event) {
        el.removeEventListener(event, handler, false);
      }
      return el;
    };
  } else {
    return function (el: HTMLElement | (Window & typeof globalThis), event: string, handler: EventListener) {
      if (el && event) {
        (el as any).detachEvent('on' + event, handler);
      }
      return el;
    };
  }
})();

/* istanbul ignore next */
export const once = function (el: HTMLElement | (Window & typeof globalThis), event: string, handler: EventListener) {
  const listener = function (this: any) {
    if (handler) {
      // eslint-disable-next-line prefer-rest-params
      handler.apply(this, arguments as any);
    }
    off(el, event, listener);
  };
  return on(el, event, listener);
};
