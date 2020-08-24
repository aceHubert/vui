import { Mixins, Component, Prop } from 'vue-property-decorator';
import Base from '../../mixins/base';
import './styles/index';

@Component({
  name: 'vui-loadmore',
})
export default class Loadmore extends Mixins(Base) {
  @Prop({ type: Boolean, default: true }) loading!: boolean;
  @Prop({ type: Boolean, default: false }) line!: boolean;

  get isDot() {
    return !this.$scopedSlots.default;
  }

  render() {
    return (
      <div
        class={[
          'vui-loadmore',
          'weui-loadmore',
          {
            'weui-loadmore_line': this.line,
            'weui-loadmore_dot': (!this.loading && this.isDot) || (this.line && this.isDot),
          },
        ]}
      >
        {!this.line && this.loading ? <i class="weui-loading"></i> : null}
        {<span class="weui-loadmore__tips">{this.$slots.default}</span>}
      </div>
    );
  }
}
