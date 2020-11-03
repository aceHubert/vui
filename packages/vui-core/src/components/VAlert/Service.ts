import Vue from 'vue';
import mergeOptions from '@/utils/mergeOptions';
import VAlert from '../VDialog/VAlert';

export type Options = {
  title?: string;
  content: string;
  buttonText?: string;
  onShow?: (instance: Vue) => void;
  onHide?: (instance: Vue) => void;
};

let $vm: VAlert;
let watcher: () => void;

export default {
  // options is contne when type is string
  show(options: string | Options, title: string) {
    if (!$vm) {
      const Component = Vue.extend(VAlert);
      $vm = new Component({
        el: document.createElement('div'),
      });
      document.body && document.body.appendChild($vm.$el);
    }

    if (typeof options === 'string') {
      $vm.content = options;
      $vm.title = title;
    } else if (typeof options === 'object') {
      mergeOptions($vm, options);
    }

    typeof options === 'object' && options.onShow && options.onShow($vm);

    // destroy watcher
    watcher && watcher();
    watcher = $vm.$watch('currentShow', (val) => {
      val === false && typeof options === 'object' && options.onHide && options.onHide($vm);
    });

    $vm.currentShow = true;
    return this.hide;
  },
  hide() {
    $vm.currentShow = false;
  },
  isVisible() {
    return $vm.currentShow;
  },
};
