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

    Vue.prototype.$vui.options = Object.assign({}, Vue.prototype.$vui.options, { confirm: opts });

    Object.defineProperty(Vue.prototype.$vui, 'confirm', {
      value: Service,
      writable: false,
    });
  },
};
