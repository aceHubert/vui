import { Mixins, Component, Prop } from 'vue-property-decorator';
import Base from '../../mixins/base';
import cleanStyle from '../../utils/clean-style';

@Component({
  name: 'vui-group-title',
})
export default class VGroupTitle extends Mixins(Base) {
  @Prop(String) color?: string;

  render() {
    return (
      <div class="weui-cells__title" style={cleanStyle({ color: this.color })}>
        {this.$slots.default}
      </div>
    );
  }
}
