import { Mixins, Component } from 'vue-property-decorator';
import Base from '../../mixins/base';
import './styles/index';

@Component({
  name: 'vui-inline-desc',
})
export default class VInlineDesc extends Mixins(Base) {
  render() {
    return <span class="vui-label-desc">{this.$slots.default}</span>;
  }
}
