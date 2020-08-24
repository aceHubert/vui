import { Mixins, Component, Prop, Watch, Ref } from 'vue-property-decorator';
import Base from '../../mixins/base';
import VButton from '../button';
import cleanStyle from '../../utils/clean-style';
import './styles/index';

@Component({
  name: 'vui-search-bar',
  inheritAttrs: false,
})
export default class SearchBar extends Mixins(Base) {
  @Prop({ type: String, default: '' }) value!: string;
  @Prop(String) placeholder?: string;
  @Prop(String) searchText?: string;
  @Prop({ type: Boolean, default: false }) showSearchButton!: boolean; // searchBtn & cancelBtn 只显示1个
  @Prop(String) cancelText?: string;
  @Prop({ type: Boolean, default: true }) showCancelButton!: boolean;
  @Prop({ type: [Array, Function], default: () => [] }) results!: Array<string | { title: string }>;
  @Prop({ type: Boolean, default: true }) autoFixed!: boolean;
  @Prop({ type: [String, Number], default: 0 }) top!: string | number;
  @Prop(String) position?: string;
  @Prop(Boolean) autoScrollToTop?: boolean;

  @Ref('input') input!: HTMLInputElement;
  @Ref('form') form!: HTMLFormElement;

  @Watch('isFixed')
  watchIsFixed(val: boolean) {
    if (val === true) {
      this.setFocus();
      this.isFocus = true;

      if (this.autoScrollToTop) {
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 150);
      }
    } else {
    }
  }

  isFocus: boolean = false;
  isCancel: boolean = true;
  isSubmit: boolean = true;
  isFixed: boolean = false;
  onInput: boolean = false;
  // from data function
  currentValue!: string;

  data() {
    return {
      currentValue: this.value,
    };
  }

  @Watch('value')
  watchValue(val: string) {
    this.currentValue = val;
  }

  get styles() {
    return cleanStyle({
      top: this.isFixed ? (typeof this.top === 'string' && isNaN(this.top) ? this.top : `${this.top}px`) : undefined,
      position: this.isFixed ? (this.position === 'absolute' ? 'absolute' : 'fixed') : 'static',
    });
  }

  setFocus() {
    this.input.focus();
  }

  setBlur() {
    this.input.blur();
  }

  emitEvent() {
    this.$nextTick(() => {
      this.$emit('input', this.currentValue);
      this.$emit('change', this.currentValue);
    });
  }

  touch() {
    this.isCancel = false;
    if (this.autoFixed) {
      this.isFixed = true;
    }
    this.$emit('touch');
  }

  handleComposition(e: Event, type: string) {
    if (type === 'start') {
      this.onInput = true;
    }
    if (type === 'end') {
      this.onInput = false;
      this.emitEvent();
    }
    if (type === 'input') {
      if (!this.onInput) {
        this.emitEvent();
      }
    }
  }

  handleClear(e: Event) {
    e.stopPropagation();
    this.currentValue = '';
    this.emitEvent();
    this.isFocus = true;
    this.setFocus();
    if (this.autoFixed && !this.isFixed) {
      this.isFixed = true;
    }
    this.$emit('clear');
  }

  handleCancel(e: Event) {
    e.stopPropagation();
    this.isCancel = true;
    this.currentValue = '';
    this.emitEvent();
    this.isFixed = false;
    this.$emit('cancel');
  }

  handleFocus(e: Event) {
    this.isFocus = true;
    this.$emit('focus', e);
    this.touch();
  }

  handleBlur(e: Event) {
    this.isFocus = false;
    this.$emit('blur', e);
  }

  handelSubmit(e: Event) {
    e.preventDefault();
    this.$emit('submit', this.currentValue);
  }

  // 预选框点击
  handleResultClick(item: string | { title: string }) {
    this.$emit('resultClick', item);
    this.isCancel = true;
    this.isFixed = false;
  }

  render() {
    const renderResultItems = () => {
      return this.results.map((item) => (
        <div class="weui-cell weui-cell_access">
          <div class="weui-cell__bd weui-cell_primary" onClick={() => this.handleResultClick(item)}>
            {this.$scopedSlots['result-item']
              ? this.$scopedSlots['result-item'](item)
              : typeof item === 'string'
              ? item
              : item.title}
          </div>
        </div>
      ));
    };

    return (
      <div class={['vui-search-bar', { 'vui-search-bar--fixed': this.isFixed }]} style={this.styles}>
        <div
          class={[
            'weui-search-bar',
            {
              'weui-search-bar_focusing':
                this.isSubmit || !this.isCancel || this.currentValue || this.$scopedSlots.append,
            },
          ]}
        >
          {this.$scopedSlots.prefix ? this.$scopedSlots.prefix({}) : null}
          <form ref="form" class="weui-search-bar__form" onSubmit={this.handelSubmit.bind(this)} action=".">
            <div class="weui-search-bar__box">
              <i class="weui-icon-search"></i>
              <input
                type="search"
                class="weui-search-bar__input"
                autocomplete="off"
                ref="input"
                vModel={this.currentValue}
                placeholder={this.placeholder || 'Search'}
                required
                onFocus={this.handleFocus.bind(this)}
                onBlur={this.handleBlur.bind(this)}
                onCompositionstart={(e: Event) => this.handleComposition(e, 'start')}
                onCompositionend={(e: Event) => this.handleComposition(e, 'end')}
                onInput={(e: Event) => this.handleComposition(e, 'input')}
              />
              <a href="javascript:" class="weui-icon-clear" onClick={this.handleClear.bind(this)}></a>
            </div>
            <label class="weui-search-bar__label" onClick={this.setFocus.bind(this)}>
              <i class="weui-icon-search"></i>
              <span>{this.placeholder || 'Search'}</span>
            </label>
          </form>
          {this.showSearchButton ? (
            <VButton
              inline
              mini
              type="primary"
              class="weui-search-bar__search-btn"
              onClick={() => this.form.requestSubmit({})}
            >
              {this.searchText || 'Search'}
            </VButton>
          ) : this.showCancelButton ? (
            <a href="javascript:" class="weui-search-bar__cancel-btn" onClick={this.handleCancel.bind(this)}>
              {this.cancelText || 'Cancel'}
            </a>
          ) : null}
          {this.$scopedSlots.append ? this.$scopedSlots.append(() => this.form.requestSubmit()) : null}
        </div>
        <transition name="vui-transition-slider-top">
          <div class="weui-cells vui-search-bar-result" v-show={this.isFixed}>
            {this.$scopedSlots.result ? this.$scopedSlots.result(renderResultItems) : renderResultItems()}
          </div>
        </transition>
      </div>
    );
  }
}
