import Vue from 'vue';
import objectAssign from 'lodash.assign';

export default function mergeOptions($vm: Vue, options: { [key: string]: any }) {
  const defaults: { [key: string]: any } = {};
  for (const propName in $vm.$options.props) {
    if (propName !== 'value') {
      defaults[propName] = $vm.$options.props[propName].default;
    }
  }
  const _options = objectAssign({}, defaults, options);
  for (const name in _options) {
    $vm[name] = _options[name];
  }
}
