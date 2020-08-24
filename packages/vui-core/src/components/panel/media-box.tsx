import { Mixins, Component, Prop } from 'vue-property-decorator';
import Base from '../../mixins/base';
import { getUrl, go } from '../../utils/router';

export type Msg = {
  title: string;
  link: string;
  thumbSrc: string;
  fallbackSrc?: string;
};

@Component({
  name: 'vui-media-box',
})
export default class VMediaBox extends Mixins(Base) {
  @Prop({ type: String, default: 'text' }) type!: 'appmsg' | 'small-appmsg' | 'text';
  @Prop([String, Object]) link?: string | { replace?: boolean }; // appmsg
  @Prop(String) thumbSrc?: string; // appmsg required
  @Prop(String) title?: string; // text|appmsg required
  @Prop(String) description?: string; // text|appmsg
  @Prop(String) fallbackSrc?: string; // appmsg, for thumb fallback
  @Prop({ type: Array, default: () => [] }) msgs!: Array<Msg>; // small-appmsg
  @Prop({ type: Array, default: () => [] }) meta!: string[]; // text
  @Prop({ type: Array, default: () => [] }) extra!: string[]; // text

  get mediaThumb(): string | undefined | never {
    // appmsg -> thumbSrc required
    if (this.type === 'appmsg' && !this.thumbSrc && process.env.NODE_ENV !== 'production') {
      throw new Error('prop thumb is required');
    }
    return this.thumbSrc;
  }

  get mediaTitle(): string | undefined | never {
    // small-appmsg -> title required
    if (this.type !== 'small-appmsg' && !this.title && process.env.NODE_ENV !== 'production') {
      throw new Error('prop title is required');
    }
    return this.title;
  }

  handleImgError(e: Event, item: { fallbackSrc?: string }) {
    this.$emit('imgError', item, e);
    if (item.fallbackSrc) {
      (e.currentTarget as HTMLImageElement).src = item.fallbackSrc;
    }
  }

  handleItemClick(e: Event, link?: string | { replace?: boolean }) {
    e.preventDefault();
    link && go(link, (this as any).$router);
  }

  renderMediaBox() {
    if (this.type === 'appmsg') {
      return (
        <a
          href={getUrl(this.link || {}, this.$router)}
          class="weui-media-box weui-media-box_appmsg"
          onClick={(e: Event) => this.handleItemClick(e, this.link)}
        >
          <div class="weui-media-box__hd">
            <img
              class="weui-media-box__thumb"
              src={this.mediaThumb}
              alt=""
              onError={(e: Event) => this.handleImgError(e, { fallbackSrc: this.fallbackSrc })}
            />
          </div>
          <div class="weui-media-box__bd">
            <h4 class="weui-media-box__title">
              {(this.$scopedSlots.title ? this.$scopedSlots.title({}) : null) || this.mediaTitle}
            </h4>
            <p class="weui-media-box__desc">{this.$slots.default || this.description}</p>
          </div>
        </a>
      );
    } else if (this.type === 'small-appmsg') {
      return (
        <div class="weui-media-box weui-media-box_small-appmsg">
          <div class="weui-cells">
            {this.msgs.map((msg) => {
              const { link, title, thumbSrc } = msg;
              return (
                <a
                  href={getUrl(link, this.$router)}
                  class="weui-cell weui-cell_access"
                  onClick={(e: Event) => this.handleItemClick(e, link)}
                >
                  <div class="weui-cell__hd">
                    <img
                      src={thumbSrc}
                      style="width:20px;margin-right:16px;display:block"
                      alt=""
                      onError={(e: Event) => this.handleImgError(e, msg)}
                    />
                  </div>
                  <div class="weui-cell__bd weui-cell_primary">
                    <p domPropsInnerHTML={title}></p>
                  </div>
                  <div class="weui-cell__ft"></div>
                </a>
              );
            })}
          </div>
        </div>
      );
    } else {
      // text
      return (
        <div class="weui-media-box weui-media-box_text" onClick={(e: Event) => this.handleItemClick(e, this.link)}>
          <h4 class="weui-media-box__title">
            {(this.$scopedSlots.title ? this.$scopedSlots.title({}) : null) || this.mediaTitle}
          </h4>
          <p class="weui-media-box__desc">{this.$slots.default || this.description}</p>
          {this.$scopedSlots.meta ? (
            <ul class="weui-media-box__info">{this.$scopedSlots.meta({})}</ul>
          ) : this.meta.length || this.extra.length ? (
            <ul class="weui-media-box__info">
              {this.meta.map((m) => {
                return <li class="weui-media-box__info__meta">{m}</li>;
              })}
              {this.extra.map((e) => {
                return <li class="weui-media-box__info__meta weui-media-box__info__meta_extra">{e}</li>;
              })}
            </ul>
          ) : null}
        </div>
      );
    }
  }

  render() {
    return this.renderMediaBox();
  }
}
