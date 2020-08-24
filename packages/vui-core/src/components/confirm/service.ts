import Vue from 'vue';
import VConfirm from '../dialog/confirm';
import mergeOptions from '../../utils/merge-options';

export type Options = {
  title?: string;
  content: string;
  cancelText?: string;
  confirmText?: string;
  showCloseButton?: boolean;
  showConfirmButton?: boolean;
  onShow?: () => void;
  onHide?: () => void;
  onConfirm?: (msg?: string) => void;
  onCancel?: () => void;
};

let $vm: VConfirm;
let watcher: () => void;

export default {
  show(options: string | Options, title?: string) {
    if (!$vm) {
      const Component = Vue.extend(VConfirm);
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

    typeof options === 'object' && options.onShow && options.onShow();

    // destroy watcher
    watcher && watcher();
    watcher = $vm.$watch('currentShow', (val) => {
      val === false && typeof options === 'object' && options.onHide && options.onHide();
    });

    $vm.$off('cancel');
    $vm.$off('confirm');

    $vm.$on('cancel', () => {
      typeof options === 'object' && options.onCancel && options.onCancel();
    });
    $vm.$on('confirm', (msg: string) => {
      typeof options === 'object' && options.onConfirm && options.onConfirm(msg);
    });
    $vm.currentShow = true;
    return this.hide;
  },
  setInputValue(val: string, focus = false) {
    // 必须在onShow中执行
    Vue.nextTick(() => {
      setTimeout(() => {
        $vm.setInputValue(val);
        focus && $vm.setInputFocus(); // 设置焦点
      }, 10);
    });
  },
  setInputFocus() {
    // 必须在onShow中执行
    Vue.nextTick(() => {
      setTimeout(() => {
        $vm.setInputFocus();
      }, 10);
    });
  },
  prompt(placeholder: string, options: Options) {
    this.show(
      Object.assign({}, options, {
        placeholder,
        showInput: true,
      }),
    );
  },
  hide() {
    $vm.currentShow = false;
  },
  isVisible() {
    return $vm.currentShow;
  },
};
