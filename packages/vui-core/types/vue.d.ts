/**
 * Augment the typings of Vue.js
 */

import Vue from 'vue';
import { Framework, Vui } from './vui';

declare module 'vue/types/vue' {
  interface Vue {
    $vui: Framework;
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<
    V extends Vue,
    Data = DefaultData<V>,
    Methods = DefaultMethods<V>,
    Computed = DefaultComputed,
    PropsDef = PropsDefinition<DefaultProps>,
    Props = DefaultProps
  > {
    vui?: Vui;
  }
}
