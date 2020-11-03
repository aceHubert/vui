import { Mixins, Component, Prop } from 'vue-property-decorator';
import Base from '@/mixins/base';
import Themeable from '@/mixins/themeable';
import './styles/index';

@Component({
  name: 'v-app',
})
export default class VApp extends Mixins(Base, Themeable) {
  @Prop({ type: String, default: 'app' }) id!: string;
  @Prop(Boolean) dark?: boolean;
  @Prop(Boolean) light?: boolean;

  get isDark(): boolean {
    return this.$vui.theme.dark;
  }

  beforeCreate() {
    if (!this.$vui || this.$vui === (this.$root as any)) {
      throw new Error('Vui is not properly initialized, see http://xxxx.com');
    }
  }

  render() {
    const Warp = <div class="vui-app--warp">{this.$slots.default}</div>;

    return (
      <div id={this.id} class={['vui-app', { 'vui-app--is-dark': this.isDark }]} data-app>
        {Warp}
      </div>
    );
  }
}
