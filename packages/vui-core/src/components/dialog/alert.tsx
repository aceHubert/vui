import { Mixins, Component, Prop, Watch } from 'vue-property-decorator';
import Base from '../../mixins/base';
import VDialog from './dialog';
import '../alert/styles/index';

@Component({
  name: 'vui-alert',
  inheritAttrs: false,
})
export default class VAlert extends Mixins(Base) {
  @Prop({ type: Boolean, default: false }) show!: boolean;
  @Prop(String) content?: string;
  @Prop(String) title?: string;
  @Prop(String) buttonText?: string;

  @Watch('show')
  watchShow(val: boolean) {
    if (this.currentShow !== val) {
      this.currentShow = val;
    }
  }

  // from data function
  currentShow!: boolean;

  data() {
    return {
      currentShow: this.show,
    };
  }

  get maskZIndex() {
    return this.VuiOptions.maskZIndex;
    // return (this.VuiOptions.alert && this.VuiOptions.alert.zIndex) || this.VuiOptions.maskZIndex;
  }

  handleClose() {
    this.currentShow = false;
  }

  render() {
    return (
      <VDialog
        class="vui-alert"
        show={this.currentShow}
        maskZIndex={this.maskZIndex}
        {...{ attrs: this.$attrs, on: this.$listeners }}
      >
        <div class="weui-dialog__hd">
          <strong class="weui-dialog__title">
            {(this.$scopedSlots.title ? this.$scopedSlots.title({}) : null) || this.title}
          </strong>
        </div>
        <div class="weui-dialog__bd">{this.$slots.default || <div domPropsInnerHTML={this.content}></div>}</div>
        <div class="weui-dialog__ft">
          <a
            href="javascript:;"
            class="weui-dialog__btn weui-dialog__btn_primary"
            onClick={this.handleClose.bind(this)}
          >
            {this.buttonText || 'Close'}
          </a>
        </div>
      </VDialog>
    );
  }
}
