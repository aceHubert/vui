import { Mixins, Component, Prop, Model, Watch } from 'vue-property-decorator';
import Base from '../../mixins/base';
import cleanStyle from '../../utils/clean-style';
import './styles/index';

@Component({
  name: 'vui-loading',
})
export default class VLoading extends Mixins(Base) {
  @Model('change', { type: Boolean, default: false }) show!: boolean;
  @Prop(String) text?: string;
  @Prop(Number) maskZIndex?: number;
  @Prop({ type: String, default: 'vui-transition-fade' }) transition!: string;

  @Watch('show')
  watchShow(val: boolean) {
    this.$emit('change', val);
  }

  get maskStyles() {
    return cleanStyle({
      zIndex:
        this.maskZIndex || (this.VuiOptions.loading && this.VuiOptions.loading.zIndex) || this.VuiOptions.maskZIndex,
    });
  }

  render() {
    return (
      <transition name={this.transition}>
        <div class={['vui-loading', !this.text ? 'vui-loading--no-text' : '']} v-show={this.show}>
          <div class="weui-mask_transparent" style={this.maskStyles}></div>
          <div class="weui-toast">
            <i class="weui-loading weui-icon_toast"></i>
            {this.text && <p class="weui-toast__content">{this.text}</p>}
            {this.$slots.default}
          </div>
        </div>
      </transition>
    );
  }
}
