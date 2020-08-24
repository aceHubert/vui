import { Mixins, Component, Prop } from 'vue-property-decorator';
import Base from '../../mixins/base';
import { go } from '../../utils/router';
import '../cell-box/styles/index';

@Component({
  name: 'vui-cell-box',
})
export default class CellBox extends Mixins(Base) {
  @Prop(Boolean) isLink?: boolean;
  @Prop([String, Object]) link?: string | { replace?: boolean };
  @Prop({ type: Boolean, default: true }) borderIntent!: boolean;
  @Prop(String) alignItems?: string;

  get styles() {
    if (this.alignItems) {
      return {
        alignItems: this.alignItems,
      };
    }
    return;
  }

  handleClick() {
    this.link && go(this.link, (this as any).$router);
  }

  render() {
    return (
      <div
        class={[
          'weui-cell',
          { 'weui-cell_access': this.isLink || !!this.link, 'vui-cell--no-border-intent': !this.borderIntent },
        ]}
        style={this.styles}
        onClick={this.handleClick.bind(this)}
      >
        {this.$slots.default}
      </div>
    );
  }
}
