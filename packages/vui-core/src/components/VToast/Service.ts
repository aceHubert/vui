import Vue from 'vue';
import VToast, { Position } from './VToast';
import mergeOptions from '@/utils/mergeOptions';

export type Options = {
  text: string;
  type?: 'success' | 'warn' | 'cancel' | 'text';
  position?: 'default' | 'top' | 'middle' | 'bottom';
  timeout?: number;
  showMask?: boolean;
  onShow?: (instance: Vue.Component) => void;
  onHide?: (instance: Vue.Component) => void;
};

let $vm: VToast;
let watcher: () => void;

export default {
  show(options: string | Options) {
    if (!$vm) {
      const Component = Vue.extend(VToast);
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
    $vm.show = true;
    return this.hide;
  },
  text(text: string, position: Position = 'default', options?: Options) {
    this.show(
      Object.assign({}, options, {
        type: 'text',
        width: 'auto',
        position,
        text,
      }),
    );
  },
  hide() {
    $vm.show = false;
  },
  isVisible() {
    return $vm.show;
  },
};
