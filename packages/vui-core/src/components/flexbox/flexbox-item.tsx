import { Mixins, Component, Prop } from 'vue-property-decorator';
import Base from '../../mixins/base';
import getParentProp from '../../utils/get-parent-prop';
import cleanStyle from '../../utils/clean-style';

@Component({
  name: 'vui-flexbox-item',
  // componentName: 'FlexBoxItem',
})
export default class FlexboxItem extends Mixins(Base) {
  @Prop({ type: Number, default: 1 }) span!: number;
  @Prop(Number) order?: number;
  @Prop(Boolean) none?: boolean; // 项本来大小， 不计算宽度

  width: number | null = null;

  get styles() {
    const gutter = parseInt(getParentProp(this, 'gutter'));

    return cleanStyle({
      flex: this.none ? 'none' : this.width ? `0 0 ${this.width}%` : undefined,
      order: this.order,
      ...(gutter > 0
        ? {
            paddingLeft: gutter / 2 + 'px',
            paddingRight: gutter / 2 + 'px',
          }
        : {}),
    });
  }

  mounted() {
    if (!this.none) {
      // 不需要计算宽度
      if (this.span > 1) {
        const totalCols = this.$parent.$children.reduce<number>((total, curr) => total + (curr as FlexboxItem).span, 0);
        this.width = (100 / totalCols) * this.span;
      } else if (this.span > 0 && this.span < 1) {
        // 0-1之间小数
        this.width = this.span * 100;
      }
    }
  }

  render() {
    return (
      <div class="weui-flex__item vui-flexbox__item" style={this.styles}>
        {this.$slots.default}
      </div>
    );
  }
}
