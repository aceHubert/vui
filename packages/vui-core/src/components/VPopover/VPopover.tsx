import { Mixins, Component, Prop, Ref } from 'vue-property-decorator';
import Base from '@/mixins/base';
import ClickOutside from '../../directives/click-outside';
import TransferDom from '../../directives/transfer-dom';
import { on, off, getOffset } from '@/utils/dom';
import './styles/index';

@Component({
  name: 'v-popover',
  directives: {
    TransferDom,
    ClickOutside,
  },
})
export default class VPopover extends Mixins(Base) {
  @Prop(String) content?: string;
  @Prop({ type: String, default: 'right', validator: (val) => ['top', 'right', 'bottom', 'left'].includes(val) })
  placement!: 'top' | 'right' | 'bottom' | 'left';
  @Prop({ type: Number, default: 5 }) gutter!: number;
  @Prop({ type: Boolean, default: true }) showArrow!: boolean;
  @Prop({ type: String, default: 'vui-transition-fade' }) transition!: string;

  @Ref('trigger') triggerEl!: HTMLSpanElement;
  @Ref('popover') popoverEl!: HTMLDivElement;

  show = true;
  position: { top: number; left: number } = {
    top: 0,
    left: 0,
  };

  popoverStyle: { top: string; left: string; display?: string } = {
    top: '0',
    left: '0',
  };

  get arrowClasses() {
    return {
      'vui-popover__arrow': this.showArrow,
      'vui-popover__arrow--up': this.showArrow && this.placement === 'bottom',
      'vui-popover__arrow--right': this.showArrow && this.placement === 'left',
      'vui-popover__arrow--left': this.showArrow && this.placement === 'right',
      'vui-popover__arrow--down': this.showArrow && this.placement === 'top',
    };
  }

  init(isReset = false) {
    const trigger = this.triggerEl.children[0] as HTMLElement;
    const popover = this.popoverEl;
    const clientRect = getOffset(trigger);
    // left/right: arrow to top is 17px, font-size:14 & line-height: 1.125em & padding: 10px => 35px
    switch (this.placement) {
      case 'top':
        this.position.left = clientRect.left - popover.offsetWidth / 2 + trigger.offsetWidth / 2;
        this.position.top = clientRect.top - popover.offsetHeight - this.gutter;
        break;
      case 'left':
        this.position.left = clientRect.left - popover.offsetWidth - this.gutter;
        this.position.top = clientRect.top + trigger.offsetHeight / 2 - 17;
        break;
      case 'right':
        this.position.left = clientRect.left + trigger.offsetWidth + this.gutter;
        this.position.top = clientRect.top + trigger.offsetHeight / 2 - 17;
        break;
      case 'bottom':
        this.position.left = clientRect.left - popover.offsetWidth / 2 + trigger.offsetWidth / 2;
        this.position.top = clientRect.top + trigger.offsetHeight + this.gutter;
        break;
    }
    if (!isReset) {
      this.show = false;
    }

    this.popoverStyle = {
      top: this.position.top + 'px',
      left: this.position.left + 'px',
      display: isReset ? this.popoverStyle.display : 'none',
    };
  }

  reset() {
    if (this.show) {
      this.init(true);
    }
  }

  toggle() {
    this.show = !this.show;
    if (this.show) {
      this.$nextTick(() => {
        this.init(true);
      });
    }
    this.$emit(this.show ? 'show' : 'hide');
  }

  handleClickOutside() {
    if (this.show) {
      this.show = false;
      this.$emit('hide');
    }
  }

  mounted() {
    this.$nextTick(() => {
      this.init();
      on(window, 'resize', this.reset);
    });
  }

  beforeDestroy() {
    off(window, 'resize', this.reset);
  }

  render() {
    return (
      <div class="vui-popover-box">
        <span ref="trigger" class="vui-popover-trigger" onClick={this.toggle.bind(this)}>
          {this.$scopedSlots.reference ? this.$scopedSlots.reference({}) : null}
        </span>
        <transition name={this.transition}>
          <div
            ref="popover"
            class="vui-popover"
            style={this.popoverStyle}
            v-show={this.show}
            v-transfer-dom
            {...{
              directives: [
                {
                  name: 'click-outside',
                  args: { closeConditional: () => this.show === true },
                  value: this.handleClickOutside.bind(this),
                },
              ],
            }}
          >
            <div class={this.arrowClasses}></div>
            <div class="vui-popover__content">
              {this.$slots.default || <div domPropsInnerHTML={this.content}></div>}
            </div>
          </div>
        </transition>
      </div>
    );
  }
}
