import { Mixins, Component, Prop } from 'vue-property-decorator';
import Base from '@/mixins/base';
import { ChildMixin } from '@/mixins/multi-items';
import getParentProp from '@/utils/getParentProp';
import cleanStyle from '@/utils/cleanStyle';

@Component({
  name: 'v-navbar-item',
  // componentName: 'NavbarItem',
})
export default class VNavbarItem extends Mixins(Base, ChildMixin) {
  @Prop(String) activeClass?: string;
  @Prop(Boolean) disabled?: boolean;

  get itemStyles() {
    const parentProps = {
      lineWidth: getParentProp(this, 'lineWidth'),
      activeColor: getParentProp(this, 'activeColor'),
      disabledColor: getParentProp(this, 'disabledColor'),
      defaultColor: getParentProp(this, 'defaultColor'),
      noAnimate: getParentProp(this, 'noAnimate'),
    };
    return cleanStyle({
      borderWidth:
        typeof parentProps.lineWidth === 'string' && isNaN(parentProps.lineWidth)
          ? parentProps.lineWidth
          : `${parentProps.lineWidth}px`,
      borderColor: parentProps.activeColor,
      color: this.currentSelected
        ? parentProps.activeColor
        : this.disabled
        ? parentProps.disabledColor
        : parentProps.defaultColor,
      border: parentProps.noAnimate ? 'auto' : 'none',
    });
  }

  render() {
    return (
      <div
        class={[
          'vui-tab__item',
          this.currentSelected ? this.activeClass : '',
          { 'vui-tab__item--active': this.currentSelected, 'vui-tab__item--disabled': this.disabled },
        ]}
        style={this.itemStyles}
        onClick={this.onItemClick}
      >
        {this.$slots.default}
      </div>
    );
  }
}
