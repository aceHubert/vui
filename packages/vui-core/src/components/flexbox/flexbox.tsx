import { Mixins, Component, Prop } from 'vue-property-decorator';
import Base from '../../mixins/base';
import './styles/index';

@Component({
  name: 'vui-flexbox',
})
export default class VFlexbox extends Mixins(Base) {
  @Prop({ type: [Number, String], default: 8 }) gutter!: number | string;

  get styles() {
    const gutter = parseInt(this.gutter);
    return this.gutter > 0
      ? {
          marginLeft: -(gutter / 2) + 'px',
          marginRight: -(gutter / 2) + 'px',
        }
      : {};
  }

  render() {
    return (
      <div class="weui-flex vui-flexbox" style={this.styles}>
        {this.$slots.default}
      </div>
    );
  }
}
