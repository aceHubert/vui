import { Mixins, Component, Watch, Prop, Ref } from 'vue-property-decorator';
import Base from '../../mixins/base';
import { ParentMixin } from '../../mixins/multi-items';
import cleanStyle from '../../utils/clean-style';
import { isDefined } from '../../utils/types';
import './styles/index';

@Component({
  name: 'vui-navbar',
})
export default class VNavbar extends Mixins(Base, ParentMixin) {
  @Prop({ type: [String, Number], default: 3 }) lineWidth!: string | number;
  @Prop(String) activeColor?: string;
  @Prop(String) barActiveColor?: string;
  @Prop(String) defaultColor?: string;
  @Prop(String) disabledColor?: string;
  @Prop(Boolean) noAnimate?: boolean;
  @Prop(Boolean) preventDefault?: boolean;
  @Prop([String, Number, Function])
  customBarWidth?: string | number | ((index: number, component: Vue) => string | number);
  @Prop({ type: Number, default: 4 }) scrollThreshold!: number;
  @Prop({ type: String, default: 'bottom', validator: (val) => ['bottom', 'top'].includes(val) })
  barPosition!: 'bottom' | 'top';

  @Ref('nav') nav!: HTMLDivElement;

  @Watch('currentIndex')
  watchCurrentIndex(newIndex: number, oldIndex: number) {
    this.direction = newIndex > oldIndex ? 'forward' : 'backward';
    this.$emit('change', newIndex);
    this.hasReady && this.scrollToActiveTab();
  }

  direction = 'forward';
  hasReady = false;

  get barLeft() {
    if (this.hasReady) {
      const nav = this.nav;
      const count = this.scrollable
        ? nav.offsetWidth / this.$children[this.currentIndex || 0].$el.getBoundingClientRect().width
        : this.number;
      return `${this.currentIndex * (100 / count)}%`;
    }
    return;
  }

  get barRight() {
    if (this.hasReady) {
      const nav = this.nav;
      const count = this.scrollable
        ? nav.offsetWidth / this.$children[this.currentIndex || 0].$el.getBoundingClientRect().width
        : this.number;
      return `${(count - this.currentIndex - 1) * (100 / count)}%`;
    }
    return;
  }

  get barClasses() {
    return {
      'vui-tab__ink-bar': true,
      'vui-tab__ink-bar--transition-forward': this.direction === 'forward',
      'vui-tab__ink-bar--transition-backward': this.direction === 'backward',
    };
  }

  get barStyles() {
    const commonStyle: Record<string, any> = {
      left: this.barLeft,
      right: this.barRight,
      display: 'block',
      height: typeof this.lineWidth === 'string' && isNaN(this.lineWidth) ? this.lineWidth : `${this.lineWidth}px`,
      transition: !this.hasReady ? 'none' : undefined,
    };
    if (!this.customBarWidth) {
      commonStyle.backgroundColor = this.barActiveColor || this.activeColor;
    } else {
      commonStyle.backgroundColor = 'transparent'; // when=prop:custom-bar-width
    }
    return cleanStyle(commonStyle);
  }

  get innerBarStyles() {
    const barWidth =
      typeof this.customBarWidth === 'function'
        ? this.customBarWidth(this.currentIndex, this.$children[this.currentIndex])
        : this.customBarWidth;

    return cleanStyle({
      width: isDefined(barWidth)
        ? typeof barWidth === 'string' && isNaN(barWidth)
          ? barWidth
          : `${barWidth}px`
        : undefined,
      background: this.barActiveColor || this.activeColor,
    });
  }

  get scrollable() {
    return this.number > this.scrollThreshold;
  }

  scrollToActiveTab() {
    if (!this.scrollable || !this.$children || !this.$children.length) {
      return;
    }
    const currentIndexTab = this.$children[this.currentIndex].$el as HTMLDivElement;
    let count = 0;
    // scroll animation
    const step = () => {
      const scrollDuration = 15;
      const nav = this.nav;
      nav.scrollLeft +=
        (currentIndexTab.offsetLeft - (nav.offsetWidth - currentIndexTab.offsetWidth) / 2 - nav.scrollLeft) /
        scrollDuration;
      if (++count < scrollDuration) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.hasReady = true;
      }, 0);
    });
  }

  render() {
    return (
      <div class="vui-tab-warp">
        <div class="vui-tab-container">
          <div
            ref="nav"
            class={[
              'vui-tab',
              {
                'vui-tab--bar-top': this.barPosition === 'top',
                'vui-tab--no-animate': this.noAnimate,
                'vui-tab--scrollable': this.scrollable,
              },
            ]}
          >
            {this.$slots.default}
            {!this.noAnimate ? (
              <div class={this.barClasses} style={this.barStyles}>
                {this.customBarWidth ? <span class="vui-tab__ink-bar-inner" style={this.innerBarStyles}></span> : null}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
