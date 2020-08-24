import { Mixins, Component, Prop } from 'vue-property-decorator';
import Base from '../../mixins/base';
import { getUrl, go } from '../../utils/router';
import './styles/index';

export type Footer = {
  title: string;
  src: string;
};

@Component({
  name: 'vui-panel',
})
export default class Panel extends Mixins(Base) {
  @Prop(String) header?: string;
  @Prop({ type: Object, default: () => ({}) }) footer!: Footer;

  handleFooterClick(e: Event, url: string | { replace?: boolean }) {
    e.preventDefault();
    go(url, (this as any).$router);
  }

  render() {
    const hasFooterProp = this.footer && this.footer.src;
    const { title, src } = this.footer;

    return (
      <div class={['weui-panel', { 'weui-panel_access': hasFooterProp }]}>
        {this.$scopedSlots.header || this.header ? (
          <div class="weui-panel__hd">
            {(this.$scopedSlots.header ? this.$scopedSlots.header({}) : null) || this.header}
          </div>
        ) : null}
        <div class="weui-panel__bd">{this.$slots.default}</div>
        {this.$scopedSlots.footer || hasFooterProp ? (
          <div class="weui-panel__ft">
            {this.$scopedSlots.footer ? (
              this.$scopedSlots.footer({})
            ) : (
              <a
                href={getUrl(src, (this as any).$router)}
                class="weui-cell weui-cell_access weui-cell_link"
                onClick={(e: Event) => this.handleFooterClick(e, src)}
              >
                <div class="weui-cell__bd">{title}</div>
                <div class="weui-cell__ft"></div>
              </a>
            )}
          </div>
        ) : null}
      </div>
    );
  }
}
