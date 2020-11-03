import { Mixins, Component, Prop } from 'vue-property-decorator';
import Base from '@/mixins/base';
import cleanStyle from '@/utils/cleanStyle';
import { isDefined } from '@/utils/types';
import './styles/index';

@Component({
  name: 'v-group',
})
export default class VGroup extends Mixins(Base) {
  @Prop(String) title?: string;
  @Prop(String) titleColor?: string;
  @Prop([String, Number]) labelWidth?: string;
  @Prop(String) labelAlign?: string;
  @Prop(String) labelMarginRight?: string;
  @Prop([String, Number]) gutter?: string | number;

  get cellsStyles() {
    return cleanStyle({
      marginTop: isDefined(this.gutter)
        ? typeof this.gutter === 'string' && isNaN(this.gutter as any)
          ? this.gutter
          : `${this.gutter}px`
        : undefined,
    });
  }

  render() {
    const groupTitle =
      (this.$scopedSlots.title ? this.$scopedSlots.title({}) : null) ||
      (this.title && (
        <div
          class="weui-cells__title"
          style={cleanStyle({ color: this.titleColor })}
          domPropsInnerHTML={this.title}
        ></div>
      ));

    return (
      <div class="vui-group">
        {groupTitle}
        <div class={['weui-cells', { 'vui-no-group-title': !groupTitle }]} style={this.cellsStyles}>
          {this.$slots.default}
        </div>
      </div>
    );
  }
}
