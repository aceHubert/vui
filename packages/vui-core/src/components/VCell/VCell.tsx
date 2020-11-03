import { Mixins, Component, Prop } from 'vue-property-decorator';
import Base from '@/mixins/base';
import getParentProp from '@/utils/getParentProp';
import cleanStyle from '@/utils/cleanStyle';
import { isDefined } from '@/utils/types';
import { go } from '@/utils/router';
import VInlineDesc from '../VInlineDesc';
import './styles/index';

@Component({
  name: 'v-cell',
})
export default class VCell extends Mixins(Base) {
  @Prop(String) label?: string;
  @Prop(String) value?: string;
  @Prop(String) icon?: string;
  @Prop(String) inlineDesc?: string;
  @Prop(Boolean) isLink?: boolean;
  @Prop(Boolean) isLoading?: boolean;
  @Prop([String, Object]) link?: string | { replace?: boolean };
  @Prop({ type: String, default: 'title' }) primary!: 'title' | 'content';
  @Prop([String, Boolean, Number]) valueAlign?: string | boolean | number;
  @Prop({ type: Boolean, default: true }) borderIntent!: boolean;
  @Prop(Boolean) disabled?: boolean;
  @Prop({ type: String, validator: (val) => ['up', 'down'].includes(val) }) arrowDirection?: 'up' | 'down';
  @Prop(String) alignItems?: string;

  get styles() {
    if (this.alignItems) {
      return {
        alignItems: this.alignItems,
      };
    }
    return;
  }

  get labelStyles() {
    const labelWidth = getParentProp(this, 'labelWidth');
    const labelMarginRight = getParentProp(this, 'labelMarginRight');

    return cleanStyle({
      width: isDefined(labelWidth)
        ? typeof labelWidth === 'string' && isNaN(labelWidth)
          ? labelWidth
          : `${labelWidth}px`
        : undefined,
      textAlign: getParentProp(this, 'labelAlign'),
      marginRight: isDefined(labelMarginRight)
        ? typeof labelMarginRight === 'string' && isNaN(labelMarginRight)
          ? labelMarginRight
          : `${labelMarginRight}px`
        : undefined,
    });
  }

  get labelClasses() {
    return {
      'vui-cell__label--justify': getParentProp(this, 'labelAlign') === 'justify',
    };
  }

  get valueClasses() {
    return {
      'vui-cell--primary': this.primary === 'content' || this.valueAlign === 'left',
      'vui-cell__ft--align-left': this.valueAlign === 'left',
      'vui-cell__ft--arrow-transition': !!this.arrowDirection,
      'vui-cell__ft--arrow-up': this.arrowDirection === 'up',
      'vui-cell__ft--arrow-down': this.arrowDirection === 'down',
    };
  }

  handleClick(e: Event) {
    e.stopPropagation();

    this.$emit('click');
    this.link && go(this.link, (this as any).$router);
  }

  render() {
    return (
      <div
        class={[
          'weui-cell',
          'vui-cell',
          {
            'weui-cell_access': this.isLink || !!this.link,
            'vui-cell--active': this.isLink || !!this.link,
            'vui-cell--no-border-intent': !this.borderIntent,
            'vui-cell--disabled': this.disabled,
          },
        ]}
        style={this.styles}
        onClick={this.handleClick.bind(this)}
      >
        <div class="weui-cell__hd">
          {(this.$scopedSlots.icon ? this.$scopedSlots.icon({}) : null) || (this.icon && <i class={this.icon}></i>)}
        </div>
        <div class={['vui-cell__bd', { 'vui-cell--primary': this.primary === 'title' && this.valueAlign !== 'left' }]}>
          <p>
            <label class={['vui-cell__label', this.labelClasses]} style={this.labelStyles}>
              {(this.$scopedSlots.label ? this.$scopedSlots.label({}) : null) || this.label}
            </label>
          </p>
          {this.$scopedSlots['inline-desc'] || this.inlineDesc ? (
            <VInlineDesc>
              {(this.$scopedSlots['inline-desc'] ? this.$scopedSlots['inline-desc']({}) : null) || this.inlineDesc}
            </VInlineDesc>
          ) : null}
        </div>
        <div class={['weui-cell__ft', this.valueClasses]}>
          {this.isLoading ? <i class="weui-loading"></i> : null}
          {this.$slots.default || this.value}
        </div>
      </div>
    );
  }
}
