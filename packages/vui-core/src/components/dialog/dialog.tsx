import { Mixins, Component, Prop, Watch } from 'vue-property-decorator';
import Base from '../../mixins/base';
import cleanStyle from '../../utils/clean-style';
import { addClass, removeClass } from '../../utils/dom';
import './styles/index';

@Component({
  name: 'vui-dialog',
})
export default class VDialog extends Mixins(Base) {
  @Prop({ type: Boolean, default: false }) show!: boolean; // support sync
  @Prop({ type: String, default: 'vui-transition-fade' }) transition!: string;
  @Prop({ type: String, default: 'vui-transition-fade' }) maskTransition!: string;
  @Prop(Number) maskZIndex?: number;
  @Prop({ type: String, default: 'ios', validator: (val) => ['ios', 'android'].includes(val) })
  theme!: 'android' | 'ios';
  @Prop({ type: Boolean, default: false }) closeOnClickMask!: boolean;

  @Watch('show')
  watchShow(val: boolean) {
    if (this.currentShow !== val) {
      this.currentShow = val;
    }
  }

  @Watch('currentShow')
  watchCurrentShow(val: boolean) {
    this.$emit('update:show', val);
    this.$emit(val ? 'show' : 'hide');
    if (val) {
      addClass(document.documentElement, 'vui-model-open');
    } else {
      removeClass(document.documentElement, 'vui-model-open');
    }
  }

  // from data function
  currentShow!: boolean;

  data() {
    return {
      currentShow: this.show,
    };
  }

  get maskStyles() {
    return cleanStyle({
      zIndex: this.maskZIndex || this.VuiOptions.maskZIndex,
      // this.maskZIndex || (this.VuiOptions.dialog && this.VuiOptions.dialog.zIndex) || this.VuiOptions.maskZIndex,
    });
  }

  handleMaskClick() {
    this.$emit('maskClick');
    this.closeOnClickMask && (this.currentShow = false);
  }

  render() {
    return (
      <div class="vui-dialog-box">
        <transition name={this.maskTransition}>
          <div
            class="weui-mask"
            style={this.maskStyles}
            v-show={this.currentShow}
            onClick={this.handleMaskClick.bind(this)}
          ></div>
        </transition>
        <transition name={this.transition}>
          <div
            class={['weui-dialog', 'vui-dialog', { 'weui-skin_android': this.theme === 'android' }]}
            v-show={this.currentShow}
          >
            {this.$slots.default}
          </div>
        </transition>
      </div>
    );
  }
}
