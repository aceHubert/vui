// Types
import { VueConstructor } from 'vue';
import { VuiUseOptions } from '@vui/core/types';

export function install(Vue: VueConstructor, options: VuiUseOptions = {}) {
  if ((install as any).installed) return;
  (install as any).installed = true;

  const components = options.components || {};
  const plugins = options.plugins || {};
  const directives = options.directives || {};

  for (const name in directives) {
    const directive = directives[name];

    Vue.directive(name, directive);
  }

  for (const name in plugins) {
    const plugin = plugins[name];

    Vue.use(plugin);
  }

  (function registerComponents(components: any) {
    if (components) {
      for (const key in components) {
        const component = components[key];

        Vue.component(component.name, component);
      }
      return true;
    }
    return false;
  })(components);

  // Used to avoid multiple mixins being setup
  // when in dev mode and hot module reload
  // https://github.com/vuejs/vue/issues/5089#issuecomment-284260111
  if (Vue.$__vui_installed__) return;
  // eslint-disable-next-line @typescript-eslint/camelcase
  Vue.$__vui_installed__ = true;

  Vue.mixin({
    beforeCreate() {
      const options = this.$options as any;

      if (options.vui) {
        options.vui.init(this, options.ssrContext);
        this.$vui = Vue.observable(options.vui.framework);

        // this.$watch(
        //   () => this.$vui.theme.dark,
        //   (val: boolean) => {
        //     console.log(val);
        //   },
        // );
      } else {
        this.$vui = (options.parent && options.parent.$vui) || this;
      }
    },
  });
}
