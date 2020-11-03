import { Mixins, Component, Prop, Model, Watch } from 'vue-property-decorator';
import Base from '@/mixins/base';
import './styles/index';

export type Position = 'default' | 'top' | 'middle' | 'bottom';

@Component({
  name: 'v-toast',
})
export default class VToast extends Mixins(Base) {
  @Model('change', { type: Boolean, default: false }) value!: boolean;
  @Prop(String) text?: string;
  @Prop({ type: Number, default: 2000 }) timeout!: number; // 毫秒
  @Prop({ type: String, default: 'success', validator: (val) => ['success', 'warn', 'cancel', 'text'].includes(val) })
  type!: 'success' | 'warn' | 'cancel' | 'text';
  @Prop({ type: String, default: '7.6em' }) width!: string;
  @Prop({ type: String, default: 'default', validator: (val) => ['default', 'top', 'middle', 'bottom'].includes(val) })
  position!: Position;
  @Prop({ type: Boolean, default: false }) showMask!: boolean;
  @Prop(Number) maskZIndex?: number;
  @Prop({ type: String, default: 'vui-loading' }) transition!: string;

  @Watch('show')
  watchShow(val: boolean) {
    if (val) {
      this.$emit('change', true);
      this.$emit('show');
      // this.fixSafariOverflowScrolling('auto')

      this.__timeout && clearTimeout(this.__timeout);
      this.__timeout = setTimeout(() => {
        this.show = false;
        this.$emit('change', false);
        this.$emit('hide');
        // this.fixSafariOverflowScrolling('touch')
      }, this.timeout);
    }
  }

  @Watch('value')
  watchValue(val: boolean) {
    this.show = val;
  }

  // from data function
  show!: boolean;
  //
  __timeout: any;

  data() {
    return {
      show: this.value,
    };
  }

  get currentTransition() {
    if (this.transition) {
      return this.transition;
    }
    if (this.position === 'top') {
      return 'vui-transition-slide-from-top';
    }
    if (this.position === 'bottom') {
      return 'vui-transition-slide-from-bottom';
    }
    return 'vui-transition-fade';
  }

  get toastClasses() {
    return [
      'weui-toast',
      'vui-toast',
      `vui-toast--${this.type}`,
      this.position !== 'default' ? `vui-toast--position-${this.position}` : '',
    ];
  }

  get labelStyles() {
    if (this.type === 'text' && this.width === 'auto') {
      return { padding: '10px' };
    }
    return;
  }

  get maskStyles() {
    return {
      zIndex: this.maskZIndex || this.VuiOptions.maskZIndex, // this.maskZIndex || (this.VuiOptions.toast && this.VuiOptions.toast.zIndex) || this.VuiOptions.maskZIndex,
    };
  }

  render() {
    return (
      <div class="vui-toast-box">
        <div class="weui-mask_transparent" style={this.maskStyles} v-show={this.showMask && this.show}></div>
        <transition name={this.currentTransition}>
          <div class={this.toastClasses} style={{ width: this.width }} v-show={this.show}>
            <i class="weui-icon-success-no-circle weui-icon_toast" v-show={this.type !== 'text'}></i>
            {
              <p class="weui-toast__content" style={this.labelStyles}>
                {this.$slots.default || this.text}
              </p>
            }
          </div>
        </transition>
      </div>
    );
  }
}
