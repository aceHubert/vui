import { Mixins, Component, Watch, Model, Prop } from 'vue-property-decorator';
import Base from '@/mixins/base';
import './styles/index';

@Component({
  name: 'v-check-icon',
})
export default class VCheckIcon extends Mixins(Base) {
  @Model('change', { type: Boolean }) checked?: boolean;
  @Prop({ type: Boolean, default: false }) disabled!: boolean;

  @Watch('checked')
  watchChecked(val: boolean) {
    if (val !== this.currentChecked) {
      this.currentChecked = val;
    }
  }

  // from data function
  currentChecked?: boolean;

  data() {
    return {
      currentChecked: this.checked,
    };
  }

  handleChange() {
    if (!this.disabled) {
      this.currentChecked = !this.currentChecked;
      this.$emit('change', this.currentChecked);
    }
  }

  render() {
    return (
      <label
        class={['vui-checkicon', { 'vui-checkicon--disabled': this.disabled }]}
        onClick={this.handleChange.bind(this)}
      >
        <i class={['vui-checkicon__icon', { 'vui-checkicon__icon--checked': this.currentChecked }]}></i>
        {this.$slots.default ? <span class="vui-checkicon__label">{this.$slots.default}</span> : null}
      </label>
    );
  }
}
