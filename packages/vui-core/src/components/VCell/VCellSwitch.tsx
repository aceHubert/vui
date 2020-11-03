import { Mixins, Component, Prop, Model, Watch } from 'vue-property-decorator';
import Base from '@/mixins/base';
import getParentProp from '@/utils/getParentProp';
import cleanStyle from '@/utils/cleanStyle';
import VSwitch from '../VSwitch';
import VInlineDesc from '../VInlineDesc';
import './styles/cell-switch';

@Component({
  name: 'v-cell-switch',
})
export default class VCellSwitch extends Mixins(Base) {
  @Model('change', { type: Boolean, default: false }) checked!: boolean;
  @Prop(String) label?: string;
  @Prop(String) inlineDesc?: string;
  @Prop(String) icon?: string;
  @Prop(Boolean) disabled?: boolean;
  @Prop(Boolean) mini?: boolean;
  @Prop(Boolean) preventDefault?: boolean; // stop default change

  @Watch('checked')
  watchChecked(val: boolean) {
    this.currentChecked = val;
  }

  @Watch('currentChecked')
  watchCurrentChecked(val: boolean) {
    this.$emit('change', val);
  }

  // from data function
  currentChecked!: boolean;

  data() {
    return {
      currentChecked: this.checked,
    };
  }

  get labelStyles() {
    const width = this.$scopedSlots.label
      ? '14em'
      : this.label
      ? Math.min(this.label.length + 1, 14) + 'em'
      : undefined;

    return cleanStyle({
      display: 'block',
      width: getParentProp(this, 'labelWidth') || width,
      textAlign: getParentProp(this, 'labelAlign'),
    });
  }

  get labelClasses() {
    return {
      'weui-label': true,
      'vui-cell__label': true,
      'vui-cell__label--justify': getParentProp(this, 'labelAlign') === 'justify',
    };
  }

  render() {
    return (
      <div class={['weui-cell', 'weui-cell_switch', 'vui-cell_switch', { 'vui-cell_switch--mini': this.mini }]}>
        <div class="weui-cell__hd">
          {(this.$scopedSlots.icon ? this.$scopedSlots.icon({}) : null) || (this.icon && <i class={this.icon}></i>)}
        </div>
        <div class="weui-cell__bd">
          <label class={this.labelClasses} style={this.labelStyles}>
            {(this.$scopedSlots.label ? this.$scopedSlots.label({}) : null) || this.label}
          </label>
          {this.$scopedSlots['inline-desc'] || this.inlineDesc ? (
            <VInlineDesc>
              {(this.$scopedSlots['inline-desc'] ? this.$scopedSlots['inline-desc']({}) : null) || this.inlineDesc}
            </VInlineDesc>
          ) : null}
        </div>
        <div class="weui-cell__ft">
          <VSwitch v-model={this.currentChecked} mini={this.mini} disabled={this.disabled}></VSwitch>
        </div>
      </div>
    );
  }
}
