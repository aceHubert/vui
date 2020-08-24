import { Mixins, Component, Prop } from 'vue-property-decorator';
import Base from '../../mixins/base';
import './styles/index';

@Component({
  name: 'vui-radio-icon',
})
export default class VRadioIcon extends Mixins(Base) {
  @Prop([String, Boolean, Number]) value?: string | boolean | number;
  @Prop([String, Boolean, Number]) label?: string | boolean | number;
  @Prop(Boolean) disabled?: boolean;

  get currentChecked() {
    return this.value === this.label;
  }

  handleChange() {
    if (!this.disabled) {
      this.$emit('input', this.label);
      this.$emit('change', this.label);
    }
  }

  render() {
    return (
      <label
        class={['vui-checkicon', { 'vui-checkicon--disabled': this.disabled }]}
        onClick={this.handleChange.bind(this)}
      >
        <i class={['vui-checkicon__icon', { 'vui-checkicon__icon--checked': this.currentChecked }]}></i>
        {<span class="vui-checkicon__label">{this.$slots.default || this.label}</span>}
      </label>
    );
  }
}
