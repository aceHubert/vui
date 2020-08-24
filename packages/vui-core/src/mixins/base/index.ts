import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Base extends Vue {
  get VuiOptions() {
    return this.$vui || {};
  }
}
