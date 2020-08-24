import { Mixins, Component, Prop, Watch, Ref } from 'vue-property-decorator';
import Base from '../../mixins/base';
import VDialog from './dialog';
import '../confirm/styles/index';

@Component({
  name: 'vui-confirm',
  inheritAttrs: false,
})
export default class VConfirm extends Mixins(Base) {
  @Prop({ type: Boolean, default: false }) show!: boolean;
  @Prop(String) content?: string;
  @Prop(String) title?: string;
  @Prop(String) cancelText?: string;
  @Prop(String) confirmText?: string;
  @Prop({ type: Boolean, default: false }) showInput!: boolean;
  @Prop(String) placeholder?: string;
  @Prop({ type: Boolean, default: true }) closeOnConfirm!: boolean;
  @Prop({ type: Boolean, default: true }) showCancelButton!: boolean;
  @Prop({ type: Boolean, default: true }) showConfirmButton!: boolean;

  @Ref('input') input!: HTMLInputElement;

  @Watch('show')
  watchShow(val: boolean) {
    if (this.currentShow !== val) {
      this.currentShow = val;
    }
  }

  inputValue: string = '';
  // from data function
  currentShow!: boolean;

  data() {
    return {
      currentShow: this.show,
    };
  }

  get maskZIndex() {
    return this.VuiOptions.maskZIndex;
    // return (this.VuiOptions.confirm && this.VuiOptions.confirm.zIndex) || this.VuiOptions.maskZIndex;
  }

  setInputValue(val: string) {
    this.inputValue = val;
  }

  setInputFocus(e?: Event) {
    e && e.preventDefault();
    this.showInput && this.input.focus();
  }

  handleCancel() {
    this.currentShow = false;
    this.$emit('cancel');
  }

  handleConfirm() {
    if (this.closeOnConfirm) {
      this.currentShow = false;
    }
    this.$emit('confirm', this.showInput ? this.inputValue : undefined);
  }

  render() {
    return (
      <VDialog
        class="vui-confirm"
        show={this.currentShow}
        maskZIndex={this.maskZIndex}
        {...{ attrs: this.$attrs, on: this.$listeners }}
      >
        <div class="weui-dialog__hd">
          <strong class="weui-dialog__title">
            {(this.$scopedSlots.title ? this.$scopedSlots.title({}) : null) || this.title}
          </strong>
        </div>
        <div class="weui-dialog__bd">
          {this.showInput ? (
            <input
              ref="input"
              type="text"
              class="vui-confirm__input"
              vModel={this.inputValue}
              placeholder={this.placeholder}
            ></input>
          ) : (
            this.$slots.default || <div domPropsInnerHTML={this.content}></div>
          )}
        </div>
        {this.showCancelButton || this.showConfirmButton ? (
          <div class="weui-dialog__ft">
            {this.showCancelButton ? (
              <a
                href="javascript:;"
                class="weui-dialog__btn weui-dialog__btn_default"
                onClick={this.handleCancel.bind(this)}
              >
                {this.cancelText || 'Close'}
              </a>
            ) : null}
            {this.showConfirmButton ? (
              <a
                href="javascript:;"
                class="weui-dialog__btn weui-dialog__btn_primary"
                onClick={this.handleConfirm.bind(this)}
              >
                {this.confirmText || 'Confirm'}
              </a>
            ) : null}
          </div>
        ) : null}
      </VDialog>
    );
  }
}
