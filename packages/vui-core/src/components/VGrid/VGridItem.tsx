import { Mixins, Component, Prop } from 'vue-property-decorator';
import Base from '@/mixins/base';
import getParentProp from '@/utils/getParentProp';
import cleanStyle from '@/utils/cleanStyle';
import { go } from '@/utils/router';

@Component({
  name: 'v-grid-item',
  // componentName: 'GridItem',
})
export default class VGridItem extends Mixins(Base) {
  @Prop(String) icon?: string;
  @Prop(String) label?: string;
  @Prop([String, Object]) link?: string | { replace?: boolean };
  @Prop(Boolean) disabled?: boolean;

  index = 0;

  get parentCols() {
    return getParentProp(this, 'columns');
  }

  get parentRows() {
    const count = getParentProp(this, 'counts');
    return count / this.parentCols + (count % this.parentCols === 0 ? 0 : 1);
  }

  get isVerticalLast() {
    return !((this.index + 1) % this.parentCols);
  }

  get isHorizontalLast() {
    return this.index < (this.parentRows === 1 ? this.parentCols : (this.parentRows - 1) * this.parentCols);
  }

  get classes() {
    return {
      'weui-grid': true,
      'vui-grid': true,
      'vui-grid--no-right-border':
        (this.isVerticalLast && !getParentProp(this, 'showLrBorders')) ||
        (!this.isVerticalLast && !getParentProp(this, 'showVerticalDividers')),
      'vui-grid--no-bottom-border':
        (this.isHorizontalLast && !getParentProp(this, 'showTbBorders')) ||
        (this.isHorizontalLast && !getParentProp(this, 'showHorizontalDividers')),
    };
  }

  get styles() {
    return cleanStyle({
      width: this.parentCols !== 3 ? 100 / this.parentCols + '%' : undefined,
    });
  }

  handleClick() {
    if (!this.disabled && !(this.$parent as any).disabled) {
      this.$emit('itemClick');
      this.link && go(this.link, (this as any).$router);
    }
  }

  created() {
    (this.$parent as any).countColumn();
  }

  destroyed() {
    (this.$parent as any).countColumn();
  }

  render() {
    return (
      <a href="javascript:;" class={this.classes} style={this.styles} onClick={this.handleClick.bind(this)}>
        {(this.$scopedSlots.icon ? this.$scopedSlots.icon({}) : null) ||
          (this.icon && (
            <div class="weui-grid__icon">
              <img src={this.icon} alt="" />
            </div>
          ))}
        {(this.$scopedSlots.label ? this.$scopedSlots.label({}) : null) ||
          (this.label && (
            <p class="weui-grid__label">
              <span domPropsInnerHTML={this.label}></span>
            </p>
          ))}
        {this.$slots.default}
      </a>
    );
  }
}
