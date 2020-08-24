import * as components from './components';
import * as directives from './directives';
import * as plugins from './plugins';
import Vui from './framework';

export default Vui;

const install = Vui.install;

Vui.install = (Vue, args) => {
  install.call(Vui, Vue, {
    components,
    directives,
    plugins,
    ...args,
  });
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
