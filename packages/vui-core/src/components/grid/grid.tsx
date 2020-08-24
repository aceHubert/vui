import { Mixins, Component, Prop } from 'vue-property-decorator';
import Base from '../../mixins/base';
import './styles/index';

@Component({
  name: 'vui-grid',
})
export default class VGrid extends Mixins(Base) {
  @Prop([String, Number]) cols?: string | number;
  @Prop({ type: Boolean, default: true }) showTbBorders!: boolean; // 显示上下边线
  @Prop({ type: Boolean, default: true }) showLrBorders!: boolean; // 显示左右边线
  @Prop({ type: Boolean, default: true }) showVerticalDividers!: boolean; // 显示单元格右边线
  @Prop({ type: Boolean, default: true }) showHorizontalDividers!: boolean; // 显示单元格下边线
  @Prop(Boolean) disabled?: boolean;

  counts = 3; // item count

  get columns() {
    return (typeof this.cols === 'string' ? parseInt(this.cols) : this.cols) || this.counts;
  }

  countColumn() {
    this.counts = this.$children.length;
    this.$children.forEach((c: any, index) => (c.index = index));
  }

  render() {
    return (
      <div
        class={[
          'weui-grids',
          'vui-grids',
          { 'vui-grids--no-left-border': !this.showLrBorders, 'vui-grids--no-top-border': !this.showTbBorders },
        ]}
      >
        {this.$slots.default}
      </div>
    );
  }
}
