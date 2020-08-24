import { Mixins, Component, Prop, Watch, Ref } from 'vue-property-decorator';
import Base from '../../mixins/base';
import './styles/index';

export type Menu = {
  key: string;
  label: string;
  type?: 'default' | 'primary' | 'warn' | 'info' | 'disabled';
};

@Component({
  name: 'vui-actionsheet',
})
export default class VActionsheet extends Mixins(Base) {
  @Prop(Boolean) value?: boolean;
  @Prop(String) header?: string; // 支持 html
  @Prop(Boolean) showCancel?: boolean;
  @Prop(String) cancelText?: boolean;
  @Prop({ type: [Object, Array], default: () => [] })
  menus!: { [key: string]: string | { label: string; type?: Menu['type'] } } | Menu[];
  @Prop({ type: String, default: 'ios', validator: (val) => ['ios', 'android'].includes(val) })
  theme!: 'android' | 'ios';
  @Prop({ type: Boolean, default: true }) closeOnClickMask!: boolean;
  @Prop({ type: Boolean, default: true }) closeOnClickMenu!: boolean;

  @Ref('iOSMenu') iOSMenu!: HTMLDivElement;

  @Watch('value')
  watchValue(val: boolean) {
    if (this.show !== val) {
      this.show = val;
    }
  }

  @Watch('show')
  watchShow(val: boolean) {
    this.$emit('input', val);
  }

  // from data function
  show!: boolean;

  data() {
    return {
      show: this.value,
    };
  }

  get formatedMenus(): Menu[] {
    return Array.isArray(this.menus)
      ? this.menus
      : Object.entries(this.menus).map(([key, label]) =>
          typeof label === 'string' ? { key, label } : { key, ...label },
        );
  }

  emitEvent(eventName: string, key: string, menu?: Menu) {
    let _menu = menu;
    if (typeof _menu === 'object') {
      _menu = JSON.parse(JSON.stringify(_menu));
    }
    this.$emit(eventName, key, _menu);
    key && this.$emit(`${eventName}-${key}`);
    this.closeOnClickMenu && (this.show = false);
  }

  handleTransitionEnd() {
    this.$emit(this.show ? 'afterShow' : 'afterHide');
  }

  handleMaskClick() {
    this.$emit('maskClick');
    this.closeOnClickMask && (this.show = false);
  }

  handleMenuClick(e: Event, menu: Menu) {
    e.stopPropagation();
    if (menu.type !== 'disabled' && menu.type !== 'info') {
      this.emitEvent('menuClick', menu.key || '', menu);
    }
  }

  mounted() {
    this.iOSMenu && this.iOSMenu.addEventListener('transitionend', this.handleTransitionEnd);
  }

  beforeDestroy() {
    this.iOSMenu && this.iOSMenu.removeEventListener('transitionend', this.handleTransitionEnd);
  }

  render() {
    const menuEl = (
      <div class="weui-actionsheet__menu">
        {this.formatedMenus.map((menu) => {
          return (
            <div
              class={['weui-actionsheet__cell', `vui-actionsheet__menu--${menu.type || 'default'}`]}
              domPropsInnerHTML={menu.label}
              onClick={(e: Event) => this.handleMenuClick(e, menu)}
            ></div>
          );
        })}
      </div>
    );

    return (
      <div class={['vui-actionsheet-box', { 'weui-skin_android': this.theme === 'android' }]}>
        <transition name="vui-transition-actionsheet-mask">
          <div class="weui-mask" v-show={this.show} onClick={this.handleMaskClick.bind(this)}></div>
        </transition>

        {this.theme === 'android' ? (
          <transition
            name="vui-transition-android-actionsheet"
            onAfterEnter={() => {
              this.$emit('afterShow');
            }}
            onAfterLeave={() => {
              this.$emit('afterHide');
            }}
          >
            <div class="vui-actionsheet weui-actionsheet" v-show={this.show}>
              {menuEl}
            </div>
          </transition>
        ) : (
          <div ref="iOSMenu" class={['vui-actionsheet', 'weui-actionsheet', { 'weui-actionsheet_toggle': this.show }]}>
            {this.$scopedSlots.header || this.header ? (
              <div class="weui-actionsheet__title">
                {(this.$scopedSlots.header ? this.$scopedSlots.header({}) : null) || (
                  <p class="weui-actionsheet__title-text" domPropsInnerHTML={this.header}></p>
                )}
              </div>
            ) : null}
            {menuEl}
            {this.showCancel ? (
              <div class="weui-actionsheet__action">
                <div class="weui-actionsheet__cell" onClick={() => this.emitEvent('itemClick', 'cancel')}>
                  {this.cancelText || 'Cancel'}
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    );
  }
}
