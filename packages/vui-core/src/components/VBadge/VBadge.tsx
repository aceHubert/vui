import { Mixins, Component } from 'vue-property-decorator';
import Base from '@/mixins/base';
import './styles/index';

@Component({
  name: 'v-badge',
})
export default class VBadge extends Mixins(Base) {
  render() {
    return <span class={['weui-badge', { 'weui-badge_dot': !this.$slots.default }]}>{this.$slots.default}</span>;
  }
}
