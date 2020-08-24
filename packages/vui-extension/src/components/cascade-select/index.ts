import _Vue from 'vue';
import CascadeSelect from './cascade-select';

/* istanbul ignore next */
CascadeSelect.install = function (Vue: typeof _Vue) {
  Vue.component(CascadeSelect.name, CascadeSelect);
};

export default CascadeSelect;
