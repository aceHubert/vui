import type { VueConstructor } from 'vue';
import Service from './service';

export type Options = {
  zIndex?: number;
};

export default {
  install: (Vue: VueConstructor, opts: Options = {}) => {
    if (!Vue.prototype.$vui) {
      Vue.prototype.$vui = {};
    }

    Vue.prototype.$vui.options = Object.assign({}, Vue.prototype.$vui.options, { loading: opts });

    Object.defineProperty(Vue.prototype.$vui, 'loading', {
      value: Service,
      writable: false,
    });
  },
};
