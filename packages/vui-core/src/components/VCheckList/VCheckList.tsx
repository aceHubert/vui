import { Mixins, Component, Prop, Watch } from 'vue-property-decorator';
import Base from '@/mixins/base';
import UuidMixin from '@/mixins/uuid';
import cleanStyle from '@/utils/cleanStyle';
import { isDefined } from '@/utils/types';
import VInlineDesc from '../VInlineDesc';
import { getValue, getLabels, getKey, getInlineDesc, isDisabled, Option, ValueList } from './helpers/objectFilter';

@Component({
  name: 'v-check-list',
  inheritAttrs: false,
})
export default class VCheckList extends Mixins(Base, UuidMixin) {
  @Prop(String) title?: string;
  @Prop(String) titleColor?: string;
  @Prop({ type: Array, default: () => [] }) value!: ValueList;
  @Prop({ type: Array, required: true, validator: (val) => val.every((v: Option) => typeof v.key !== 'undefined') })
  options!: Array<Option>;
  @Prop({ type: String, default: 'right' }) labelPosition!: string;
  @Prop(Number) max?: number;
  @Prop([String, Number]) gutter?: string | number;

  @Watch('value')
  watchValue(val: ValueList) {
    if (this.value.length !== this.currentValue.length || this.currentValue.some((item) => !val.includes(item))) {
      this.currentValue = val;
    }
  }

  @Watch('options')
  watchOptions(val: Array<Option>) {
    this.currentOptions = val;
  }

  // from data function
  currentValue!: ValueList;
  currentOptions!: Array<Option>;

  data() {
    return {
      currentValue: this.value,
      currentOptions: this.options,
    };
  }

  get isRadio() {
    if (typeof this.max === 'undefined') {
      return false;
    } else {
      return this.max === 1;
    }
  }

  get boxStyles() {
    return cleanStyle({
      marginTop: isDefined(this.gutter)
        ? typeof this.gutter === 'string' && isNaN(this.gutter)
          ? this.gutter
          : `${this.gutter}px`
        : undefined,
    });
  }

  handleChange(e: Event, value: any) {
    const { checked } = e.currentTarget as HTMLInputElement;
    if (checked) {
      if (this.isRadio) {
        this.currentValue.splice(0, 1, value);
      } else if (this.max && this.max > 0 && this.currentValue.length >= this.max) {
        this.$emit('limited', this.max);
        (e.currentTarget as HTMLInputElement).checked = false;
      } else {
        this.currentValue.push(value);
      }
    } else {
      this.currentValue.splice(this.currentValue.indexOf(value), 1);
    }

    const val = JSON.parse(JSON.stringify(this.currentValue));
    this.$emit('input', val);
    this.$emit('change', val, getLabels(this.currentOptions, val));
  }

  render() {
    const labelAtLeft = this.labelPosition === 'left';

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
      <div>
        {groupTitle}
        <div
          class={[
            'weui-cells',
            'weui-cells_checkbox',
            'vui-checklist',
            { 'vui-no-group-title': !groupTitle, 'vui-checklist--label-left': labelAtLeft },
          ]}
          style={this.boxStyles}
        >
          {this.currentOptions.map((option) => {
            return (
              <label
                class={[
                  'weui-cell',
                  'weui-check__label',
                  'vui-checklist__item',
                  { 'vui-checklist__item--disabled': isDisabled(option) },
                ]}
              >
                <div class="weui-cell__hd">
                  <input
                    type="checkbox"
                    class="weui-check"
                    name={`vui-check-list-${this.uuid}`}
                    value={getKey(option)}
                    checked={this.currentValue.includes(getKey(option))}
                    disabled={isDisabled(option)}
                    onChange={(e: Event) => this.handleChange(e, getKey(option))}
                  ></input>
                  <i class="weui-icon-checked"></i>
                </div>
                <div class="weui-cell__bd">
                  {this.$scopedSlots.default
                    ? this.$scopedSlots.default(option)
                    : [
                        <p>{getValue(option)}</p>,
                        getInlineDesc(option) ? <VInlineDesc>{getInlineDesc(option)}</VInlineDesc> : null,
                      ]}
                </div>
                {this.$scopedSlots.footer ? <div class="weui-cell__ft">{this.$scopedSlots.footer(option)}</div> : null}
              </label>
            );
          })}
        </div>
      </div>
    );
  }
}
