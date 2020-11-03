import Vue from 'vue';
import mergeOptions from '@/utils/mergeOptions';
import VLoading from './VLoading';

export type Options = {
  text: string;
  delay?: number;
  onShow?: (instance: Vue.Component) => void;
  onHide?: (instance: Vue.Component) => void;
};

let $vm: VLoading;
let watcher: () => void;
let delayTime: any = null;

export default {
  show(options: string | Options = '') {
    if (!$vm) {
      const Component = Vue.extend(VLoading);
      $vm = new Component({
        el: document.createElement('div'),
      });
      document.body && document.body.appendChild($vm.$el);
    }

    // destroy watcher
    watcher && watcher();
    if (typeof options === 'string') {
      $vm.text = options;
    } else if (typeof options === 'object') {
      mergeOptions($vm, options);
    }
    if (typeof options === 'object' && (options.onShow || options.onHide)) {
      watcher = $vm.$watch('show', (val) => {
        val && options.onShow && options.onShow($vm);
        val === false && options.onHide && options.onHide($vm);
      });
    }
    delayTime && clearTimeout(delayTime);
    delayTime = setTimeout(
      () => {
        $vm.show = true;
      },
      typeof options === 'string' ? 0 : options.delay || 0,
    );
    return this.hide;
  },
  hide() {
    if (delayTime) {
      clearTimeout(delayTime);
      delayTime = null;
    }
    $vm.show = false;
  },
  isVisible() {
    return $vm.show;
  },
};
