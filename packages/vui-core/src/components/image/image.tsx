import throttle from 'lodash.throttle';
import { Mixins, Component, Prop, Watch } from 'vue-property-decorator';
import Base from '../../mixins/base';
import { isHtmlElement, isString } from '../../utils/types';
import { on, off, getScrollContainer, isInContainer } from '../../utils/dom';
import cleanStyle from '../../utils/clean-style';
import { isDefined } from '../../utils/types';
import './styles/index';

const isSupportObjectFit = () => document.documentElement && document.documentElement.style.objectFit !== undefined;

const ObjectFit = {
  NONE: 'none',
  CONTAIN: 'contain',
  COVER: 'cover',
  FILL: 'fill',
  SCALE_DOWN: 'scale-down',
} as const;

export type ObjectFit$Value = typeof ObjectFit[keyof typeof ObjectFit];

@Component({
  name: 'vui-image',
  inheritAttrs: false,
})
export default class VImage extends Mixins(Base) {
  @Prop({ type: String, required: true }) src!: string;
  @Prop(String) defaultSrc?: string;
  @Prop(String) fallbackSrc?: string;
  @Prop(Boolean) circled?: boolean;
  @Prop(Boolean) bordered?: boolean;
  @Prop(Boolean) lazy?: boolean;
  @Prop({}) scrollContainer: any;
  @Prop(String) fit?: ObjectFit$Value;
  @Prop([String, Number]) width?: string | number;
  @Prop([String, Number]) height?: string | number;

  @Watch('src')
  watchSrc(_val: string) {
    this.show && this.loadImage();
  }

  @Watch('show')
  watchShow(val: boolean) {
    val && this.loadImage();
  }

  loading: boolean = true;
  error: boolean = false;
  imageWidth: number = 0;
  imageHeight: number = 0;
  // from data function
  show!: boolean;
  //
  __scrollContainer: any;
  __lazyLoadHandler: any;

  data() {
    return {
      show: !this.lazy,
    };
  }

  get boxStyles() {
    const { width, height } = this;
    return cleanStyle({
      width: isDefined(width) ? (typeof width === 'string' && isNaN(width) ? width : `${width}px`) : undefined,
      height: isDefined(height) ? (typeof height === 'string' && isNaN(height) ? height : `${height}px`) : undefined,
    });
  }

  get imageStyles() {
    const { fit } = this;
    if (!this.$isServer && fit) {
      return isSupportObjectFit() ? { 'object-fit': fit } : this.getImageStyle(fit);
    }
    return;
  }

  loadImage() {
    if (this.$isServer) return;

    // reset status
    this.loading = true;
    this.error = false;

    const img = new Image();
    img.onload = (e) => this.handleLoad(e, img);
    img.onerror = this.handleError.bind(this);

    // bind html attrs
    // so it can behave consistently
    Object.keys(this.$attrs).forEach((key) => {
      const value = this.$attrs[key];
      // fix srcSet undfined or null to triggter onerror
      typeof value !== 'undefined' && value !== null && img.setAttribute(key, value);
    });

    img.src = this.src;
  }

  getImageStyle(fit: ObjectFit$Value) {
    const { imageWidth, imageHeight } = this;
    const { clientWidth: containerWidth, clientHeight: containerHeight } = this.$el;

    if (!imageWidth || !imageHeight || !containerWidth || !containerHeight) return {};

    const vertical = imageWidth / imageHeight < 1;

    if (fit === ObjectFit.SCALE_DOWN) {
      const isSmaller = imageWidth < containerWidth && imageHeight < containerHeight;
      fit = isSmaller ? ObjectFit.NONE : ObjectFit.CONTAIN;
    }
    switch (fit) {
      case ObjectFit.NONE:
        return { width: 'auto', height: 'auto' };
      case ObjectFit.CONTAIN:
        return vertical ? { width: 'auto' } : { height: 'auto' };
      case ObjectFit.COVER:
        return vertical ? { height: 'auto' } : { width: 'auto' };
      default:
        return {};
    }
  }

  handleLoad(evnet: Event, img: HTMLImageElement) {
    this.imageWidth = img.width;
    this.imageHeight = img.height;
    this.loading = false;
    this.error = false;
  }

  handleError(e: Event | string) {
    this.loading = false;
    this.error = true;
    this.$emit('error', e);
  }

  handleLazyLoad() {
    if (isInContainer(this.$el, this.__scrollContainer)) {
      this.show = true;
      this.removeLazyLoadListener();
    }
  }

  addLazyLoadListener() {
    if (this.$isServer) return;
    const { scrollContainer } = this;
    let _scrollContainer = null;
    if (isHtmlElement(scrollContainer)) {
      _scrollContainer = scrollContainer;
    } else if (isString(scrollContainer)) {
      _scrollContainer = document.querySelector(scrollContainer as string);
    } else {
      _scrollContainer = getScrollContainer(this.$el as HTMLElement);
    }
    if (_scrollContainer) {
      this.__scrollContainer = _scrollContainer;
      this.__lazyLoadHandler = throttle(this.handleLazyLoad, 200);
      on(_scrollContainer, 'scroll', this.__lazyLoadHandler);
      this.handleLazyLoad();
    }
  }

  removeLazyLoadListener() {
    const { __scrollContainer, __lazyLoadHandler } = this;
    if (this.$isServer || !__scrollContainer || !__lazyLoadHandler) return;
    off(__scrollContainer, 'scroll', __lazyLoadHandler);
    this.__scrollContainer = null;
    this.__lazyLoadHandler = null;
  }

  mounted() {
    if (this.lazy) {
      this.addLazyLoadListener();
    } else {
      this.loadImage();
    }
  }

  beforeDestory() {
    this.lazy && this.removeLazyLoadListener();
  }

  render() {
    return (
      <div
        class={['vui-image', { 'vui-image--circled': this.circled, 'vui-image--bordered': this.bordered }]}
        style={this.boxStyles}
      >
        {this.loading ? (
          this.$scopedSlots.placeholder ? (
            this.$scopedSlots.placeholder({})
          ) : this.defaultSrc ? (
            <img
              src={this.defaultSrc}
              class="vui-image__placeholder"
              style={this.imageStyles}
              alt="placeholder-img"
            ></img>
          ) : (
            <div class="vui-image__placeholder">Loading</div>
          )
        ) : this.error ? (
          this.$scopedSlots.fallback ? (
            this.$scopedSlots.fallback({})
          ) : this.fallbackSrc ? (
            <img src={this.fallbackSrc} class="vui-image__fallback" style={this.imageStyles} alt="fallback-img"></img>
          ) : (
            <div class="vui-image__fallback">Error</div>
          )
        ) : (
          <img
            src={this.src}
            class="vui-image__inner"
            style={this.imageStyles}
            {...{ attrs: this.$attrs, on: this.$listeners }}
          ></img>
        )}
      </div>
    );
  }
}
