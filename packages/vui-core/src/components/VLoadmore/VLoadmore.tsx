import { Mixins, Component, Prop } from 'vue-property-decorator';
import Base from '@/mixins/base';
import './styles/index';

@Component({
  name: 'v-loadmore',
})
export default class VLoadmore extends Mixins(Base) {
  @Prop({ type: Boolean, default: true }) loading!: boolean;
  @Prop({ type: Boolean, default: false }) line!: boolean;

  render() {
    const isDot = !this.$slots.default;

    return (
      <div
        class={[
          'vui-loadmore',
          'weui-loadmore',
          {
            'weui-loadmore_line': this.line,
            'weui-loadmore_dot': (!this.loading && isDot) || (this.line && isDot),
          },
        ]}
      >
        {!this.line && this.loading ? <i class="weui-loading"></i> : null}
        {<span class="weui-loadmore__tips">{this.$slots.default}</span>}
      </div>
    );
  }
}
