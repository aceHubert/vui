import { VueConstructor } from 'vue';
import Service from './Service';

export type Options = {
  zIndex?: number;
};

export default {
  install: (Vue: VueConstructor, opts: Options = {}) => {
    if (!Vue.prototype.$vui) {
      Vue.prototype.$vui = {};
    }

    Vue.prototype.$vui.options = Object.assign({}, Vue.prototype.$vui.options, { toast: opts });

    Object.defineProperty(Vue.prototype.$vui, 'toast', {
      value: Service,
      writable: false,
    });
  },
};
