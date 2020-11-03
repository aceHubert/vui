import { Mixins, Component, Model, Watch, Prop } from 'vue-property-decorator';
import Base from '@/mixins/base';
import './styles/index';

@Component({
  name: 'v-switch',
})
export default class VSwitch extends Mixins(Base) {
  @Model('change', Boolean) checked?: boolean;
  @Prop(Boolean) disabled?: boolean;
  @Prop(Boolean) mini?: boolean;

  currentChecked!: boolean;

  data() {
    return {
      currentChecked: this.checked,
    };
  }

  @Watch('checked')
  watchChecked(val: boolean) {
    this.currentChecked = val;
  }

  @Watch('currentChecked')
  watchCurrentChecked(val: boolean) {
    this.$emit('change', val);
  }

  render() {
    return (
      <input
        type="checkbox"
        v-model={this.currentChecked}
        class={['weui-switch', 'vui-switch', { 'vui-switch--mini': this.mini, 'vui-switch--disabled': this.disabled }]}
        disabled={this.disabled}
      ></input>
    );
  }
}
