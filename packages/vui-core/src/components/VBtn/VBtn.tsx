import { Mixins, Component, Prop } from 'vue-property-decorator';
import Base from '@/mixins/base';
import Colorable from '@/mixins/colorable';
import { go } from '@/utils/router';
import './styles/index';

// Types
import { ButtonType } from '@vui/core/types/vui';

@Component({
  name: 'v-btn',
  inheritAttrs: false,
})
export default class VBtn extends Mixins(Base, Colorable) {
  @Prop({ type: String, default: 'default' }) type!: ButtonType;
  @Prop(String) icon?: string;
  @Prop(Boolean) rounded?: boolean;
  @Prop(Boolean) circled?: boolean;
  @Prop(Boolean) plain?: boolean;
  @Prop(Boolean) mini?: boolean;
  @Prop(Boolean) inline?: boolean;
  @Prop(Boolean) loading?: boolean;
  @Prop(String) loadingText?: string;
  @Prop(Boolean) disabled?: boolean;
  @Prop([String, Object]) link?: string | { replace?: boolean };

  get btnIcon() {
    if (this.circled && !this.icon && process.env.NODE_ENV !== 'production') {
      throw new Error('Prop icon is required');
    }
    return this.icon;
  }

  get classes() {
    const classnames = {
      'weui-btn': true,
      [this.plain ? `weui-btn_plain-${this.type}` : `weui-btn_${this.type}`]: true,
      'weui-btn_mini': this.mini,
      'weui-btn_inline': this.inline,
      'vui-btn--rounded': this.rounded,
      'vui-btn--circled': !this.rounded && this.circled,
      'weui-btn_loading': this.loading,

      [this.plain ? 'weui-btn_plain-disabled' : 'weui-btn_disabled']: this.disabled,
    };
    return classnames;
  }

  get $$listeners() {
    const { click, ...rest } = this.$listeners;
    return {
      click: this.link ? () => go(this.link!, (this as any).$router) : click || (() => {}),
      ...rest,
    };
  }

  render() {
    return (
      <button
        class={this.classes}
        disabled={this.disabled || this.loading}
        {...{ attrs: this.$attrs, on: this.$$listeners }}
      >
        {this.loading ? (
          <span>
            <i class="weui-loading"></i>
            {this.loadingText || ''}
          </span>
        ) : this.circled ? (
          <i class={this.btnIcon}></i>
        ) : null}
        {!this.circled && !this.loading ? this.$slots.default : null}
      </button>
    );
  }
}
