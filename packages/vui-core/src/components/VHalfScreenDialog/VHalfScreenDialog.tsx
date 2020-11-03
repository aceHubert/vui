// @flow
// @jsx h
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { addClass, removeClass } from '@/utils/dom';

@Component({
  name: 'v-half-screen-dialog',
})
export default class VHalfScreenDialog extends Vue {
  @Prop({ type: Boolean, default: false }) show!: boolean; // support sync
  @Prop(String) title?: string;
  @Prop(String) subtitle?: string;
  @Prop({ type: String, default: 'none', validator: (val) => ['none', 'text', 'goback', 'close'].includes(val) })
  hdLeftBtnIcon!: 'none' | 'text' | 'goback' | 'close';
  @Prop(String) hdLeftBtnText?: string;
  @Prop({ type: String, default: 'none', validator: (val) => ['none', 'text', 'close', 'more'].includes(val) })
  hdRightBtnIcon!: 'none' | 'text' | 'close' | 'more';
  @Prop(String) hdRightBtnText?: string;
  @Prop({ type: String, default: 'vui-transition-fade' }) transition!: string;
  @Prop({ type: String, default: 'vui-transition-fade' }) maskTransition!: string;
  @Prop(Number) maskZIndex?: number;
  @Prop({ type: Boolean, default: false }) closeOnClickMask!: boolean;

  // from data function
  currentShow!: boolean;

  data() {
    return {
      currentShow: this.show,
    };
  }

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

  get maskStyles() {
    return {
      zIndex: this.maskZIndex,
    };
  }

  handleMaskClick() {
    this.$emit('maskClick');
    this.closeOnClickMask && (this.currentShow = false);
  }

  handleHdLeftBtnClick() {
    this.$emit('hdLeftBtnClick');
    this.hdLeftBtnIcon === 'close' && (this.currentShow = false);
  }

  handleHdRightBtnClick() {
    this.$emit('hdRightBtnClick');
    this.hdRightBtnIcon === 'close' && (this.currentShow = false);
  }

  /** 在 v-if 中使用 */
  destroyed() {
    removeClass(document.documentElement, 'vui-model-open');
  }

  render(h: any) {
    return (
      <div class="vui-half-screen-dialog-box">
        <transition name={this.maskTransition}>
          <div
            class="weui-mask"
            style={this.maskStyles}
            v-show={this.currentShow}
            onClick={this.handleMaskClick.bind(this)}
          ></div>
        </transition>
        <transition name={this.transition}>
          <div class={['weui-half-screen-dialog', 'vui-half-screen-dialog']} v-show={this.currentShow}>
            <div class="weui-half-screen-dialog__hd">
              <div class="weui-half-screen-dialog__hd__side">
                {this.hdLeftBtnIcon !== 'none' ? (
                  <button
                    class={[
                      'weui-icon-btn',
                      this.hdLeftBtnIcon !== 'text' ? `weui-icon-btn_${this.hdLeftBtnIcon}` : '',
                    ]}
                    onClick={this.handleHdLeftBtnClick.bind(this)}
                  >
                    {this.hdLeftBtnIcon === 'text' ? this.hdLeftBtnText : null}
                  </button>
                ) : null}
              </div>
              <div class="weui-half-screen-dialog__hd__main">
                <strong class="weui-half-screen-dialog__title">
                  {(this.$scopedSlots.title ? this.$scopedSlots.title({}) : null) || this.title}
                </strong>
                {this.$scopedSlots.subtitle || this.subtitle ? (
                  <span class="weui-half-screen-dialog__subtitle">
                    {this.$scopedSlots.subtitle ? this.$scopedSlots.subtitle({}) : this.subtitle}
                  </span>
                ) : null}
              </div>
              ˝
              <div class="weui-half-screen-dialog__hd__side">
                {this.hdRightBtnIcon !== 'none' ? (
                  <button
                    class={[
                      'weui-icon-btn',
                      this.hdRightBtnIcon !== 'text' ? `weui-icon-btn_${this.hdRightBtnIcon}` : '',
                    ]}
                    onClick={this.handleHdRightBtnClick.bind(this)}
                  >
                    {this.hdRightBtnIcon === 'text' ? this.hdRightBtnText : null}
                  </button>
                ) : null}
              </div>
            </div>
            <div class="weui-half-screen-dialog__bd">{this.$slots.default}</div>
            {this.$scopedSlots.footer ? (
              <div class="weui-half-screen-dialog__ft">{this.$scopedSlots.footer({})}</div>
            ) : null}
          </div>
        </transition>
      </div>
    );
  }
}
