import debounce from 'lodash.debounce';
import { Mixins, Component, Prop, Model, Ref, Watch } from 'vue-property-decorator';
import Base from '../../mixins/base';
import calculateChange from './helpers/calculate-change';
import cleanStyle from '../../utils/clean-style';
import { on, off } from '../../utils/dom';
import './styles/index';

@Component({
  name: 'vui-slider',
})
export default class VSlider extends Mixins(Base) {
  @Model('change', { type: Number, default: 0 }) value!: number;
  @Prop({ type: Number, default: 0 }) min!: number;
  @Prop({ type: Number, default: 100 }) max!: number;
  @Prop({ type: Number, default: 1 }) step!: number;
  @Prop({ type: Number, default: 0 }) decimals!: number; // 保留小数位， 如果step为小数，则以step小数位为准
  @Prop({ type: [String, Number], default: 2 }) barWidth!: string | number;
  @Prop(String) barColor!: string;
  @Prop({ type: Boolean, default: false }) showLabel!: boolean;
  @Prop({ type: Boolean, default: false }) disabled!: boolean;

  @Ref('container') containerEl!: HTMLDivElement;

  @Watch('value')
  watchValue(val: number) {
    if (val !== this.currentValue) {
      this.calcValue(val);
    }
  }

  @Watch('min')
  @Watch('max')
  watchMinAndMax(_val: number) {
    this.currentMin = Math.min(this.min, this.max);
    this.currentMax = Math.max(this.min, this.max);
    this.calcValue(this.currentValue);
  }

  @Watch('step')
  watchStep(_val: number) {
    const value = this.calcScaleValue(this.currentValue);
    if (this.currentValue !== value) {
      this.currentValue = value;
      this.$emit('change', value);
    }
  }

  hover: boolean = false;
  pressed: boolean = false;
  // from data function
  currentMin!: number;
  currentMax!: number;
  currentValue!: number;

  data() {
    return {
      currentMin: this.min,
      currentMax: this.max,
      currentValue: this.value,
    };
  }

  get classes() {
    return {
      'weui-slider': true,
      'vui-slider': true,
      'vui-slider--disabled': this.disabled,
      'vui-slider--hover': this.hover,
      'vui-slider--pressed': this.pressed,
    };
  }

  get barStyles() {
    return cleanStyle({
      height:
        typeof this.barWidth === 'string' && isNaN(this.barWidth) ? this.barWidth : `${parseInt(this.barWidth)}px`,
      backgroundColor: this.barColor,
    });
  }

  get containerStyles() {
    return cleanStyle({
      height:
        typeof this.barWidth === 'string' && isNaN(this.barWidth) ? this.barWidth : `${parseInt(this.barWidth)}px`,
    });
  }

  get offset() {
    const { currentValue, currentMin, currentMax } = this;
    return Math.round(((currentValue - currentMin) / (currentMax - currentMin)) * 100);
  }

  // value 必须 在 min/max 之间否则取min
  calcValue(val: number) {
    const { currentValue, currentMin, currentMax } = this;

    let value = val;
    if (value < currentMin) {
      value = currentMin;
    } else if (value > currentMax) {
      value = currentMax;
    }

    value = this.calcScaleValue(value);
    // 在created和value/min/max变化时调用，触发change事件
    if (value !== currentValue) {
      this.currentValue = value;
      this.$emit('change', value);
    }
  }

  // 计算步长
  calcScaleValue(val: number) {
    const { step, currentMin, currentMax } = this;
    if (step !== 1) {
      val -= currentMin;
      let halfStep = step / 2;
      if ((currentMax - currentMin) % step > 0 && val / step > Math.floor((currentMax - currentMin) / step)) {
        halfStep = ((currentMax - currentMin) % step) / 2;
      }
      if (val % step > halfStep) {
        const upValue = currentMin + Math.ceil(val / step) * step;
        return upValue > currentMax ? currentMax : upValue;
      } else {
        return currentMin + Math.floor(val / step) * step;
      }
    } else {
      return val;
    }
  }

  handleChangeComplete = debounce((value: number) => {
    this.$emit('changeComplete', value);
  }, 200);

  triggerChange(_e: Event) {
    this.handleChangeComplete(this.currentValue);
    this.$emit('change', this.currentValue);
  }

  handleChange(e: Event, _skip?: boolean) {
    if (this.disabled) return;

    const { decimals, step, currentMin, currentMax } = this;
    const offset = calculateChange(e, {}, this.containerEl);
    // 保留小数位数
    let decimal = Math.abs(decimals);
    // 如果step 为小数，保留相同小数位
    decimal = decimal === 0 && step > 0 && String(step).indexOf('.') > 0 ? String(step).split('.')[1].length : decimal;
    let value = (offset / 100) * (currentMax - currentMin) + currentMin;

    if (decimal > 0) {
      const pow = Math.pow(10, decimal);
      value = Math.round(value * pow) / pow;
    } else {
      value = Math.round(value);
    }

    const newValue = this.calcScaleValue(value);
    if (this.currentValue !== newValue) {
      this.currentValue = newValue;
      this.$nextTick(() => {
        this.triggerChange(e);
      });
    }
  }

  handleMouseOver() {
    this.hover = true;
  }

  handleMouseOut() {
    this.hover = false;
  }

  handleTouchStart(e: Event, skip: boolean) {
    this.pressed = true;
    this.$emit('start', this.currentValue, e);
    this.handleChange(e, skip);
    on(window, 'touchend', this.handleMouseUp);
  }

  handleMouseDown(e: Event) {
    this.pressed = true;
    this.$emit('start', this.currentValue, e);
    this.handleChange(e, true);
    on(window, 'mousemove', this.handleChange);
    on(window, 'mouseup', this.handleMouseUp);
  }

  handleMouseUp(e: Event) {
    this.pressed = false;
    this.unbindEventListeners();
    this.$emit('end', this.currentValue, e);
  }

  unbindEventListeners() {
    off(window, 'mousemove', this.handleChange);
    off(window, 'mouseup', this.handleMouseUp);
    off(window, 'touchend', this.handleMouseUp);
  }

  created() {
    this.currentMin = Math.min(this.min, this.max);
    this.currentMax = Math.max(this.min, this.max);
    this.calcValue(this.value);
  }

  beforeDestroy() {
    this.unbindEventListeners();
  }

  render() {
    const { currentMin, currentMax, showLabel } = this;

    const slider = (
      <div class={this.classes}>
        <div
          ref="container"
          class="weui-slider__inner"
          style={this.containerEl}
          onMouseover={this.handleMouseOver.bind(this)}
          onMouseout={this.handleMouseOut.bind(this)}
          onMousedown={this.handleMouseDown.bind(this)}
          onTouchstart={this.handleTouchStart.bind(this)}
          onTouchmove={this.handleChange.bind(this)}
        >
          <div class="weui-slider__track" style={{ width: `${this.offset}%`, ...this.barStyles }}></div>
          <div class="weui-slider__handler" style={{ left: `${this.offset}%` }}></div>
        </div>
      </div>
    );

    return showLabel ? (
      <div class="weui-slider-box">
        <div class="weui-slider-box__value">{currentMin}</div>
        {slider}
        <div class="weui-slider-box__value">{currentMax}</div>
      </div>
    ) : (
      slider
    );
  }
}
