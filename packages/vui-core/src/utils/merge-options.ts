import Vue from 'vue';
import objectAssign from 'lodash.assign';

export default function mergeOptions($vm: Vue, options: { [key: string]: any }) {
  const defaults: { [key: string]: any } = {};
  for (const i in $vm.$options.props) {
    if (i !== 'value') {
      defaults[i] = $vm.$options.props[i].default;
    }
  }
  const _options = objectAssign({}, defaults, options);
  for (const i in _options) {
    $vm[i] = _options[i];
  }
}
