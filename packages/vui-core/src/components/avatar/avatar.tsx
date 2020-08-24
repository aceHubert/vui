import { Mixins, Component, Prop } from 'vue-property-decorator';
import Base from '../../mixins/base';
import VImage from '../image';
import cleanStyle from '../../utils/clean-style';
import { isDefined } from '../../utils/types';
import './styles/index';

@Component({
  name: 'vui-avatar',
  inheritAttrs: false,
})
export default class VAvatar extends Mixins(Base) {
  @Prop({ type: String, required: true }) src!: string;
  @Prop(String) icon?: string;
  @Prop({ type: String, default: 'circle' }) shape!: 'circle' | 'square';
  @Prop({ type: [String, Number], default: 56 }) size!: string | number;
  @Prop(Function) error?: () => void | false;
  @Prop(String) label?: string;
  @Prop([Number, String]) labelWidth?: number | string;
  @Prop({ type: String, default: 'bottom' }) labelPosition?: 'bottom' | 'right';
  @Prop({ type: Number, default: 0 }) borderWidth!: number;
  // for label
  @Prop(Boolean) ellipsis?: boolean;

  isImageExist: boolean = true;

  get boxStyles() {
    return {
      textAlign: 'center',
      display: this.labelPosition === 'right' ? 'inline-flex' : 'inline-block',
    };
  }

  get avatarClasses() {
    const { icon, shape } = this;
    const classList = ['vui-avatar'];
    if (icon) {
      classList.push('vui-avatar--icon');
    }
    if (shape) {
      classList.push(`vui-avatar--${shape}`);
    }
    return classList.join(' ');
  }

  get avatarStyles() {
    const { size, labelPosition, borderWidth } = this;
    const sizeStyle =
      typeof size === 'string' && isNaN(size)
        ? {
            height: size,
            width: size,
            lineHeight: size,
          }
        : {
            height: `${size}px`,
            width: `${size}px`,
            lineHeight: `${size}px`,
          };
    return Object.assign(
      {},
      sizeStyle,
      cleanStyle({
        borderWidth: `${borderWidth}px`,
        alignSelf: labelPosition === 'right' ? 'center' : undefined,
      }),
    );
  }

  get labelStyles() {
    const labelWidth = isDefined(this.labelWidth)
      ? typeof this.labelWidth === 'string' && isNaN(this.labelWidth)
        ? this.labelWidth
        : `${this.labelWidth}px`
      : undefined;
    if (this.labelWidth) {
      return {
        width: this.labelWidth,
      };
    }
    return this.ellipsis
      ? {
          width: labelWidth || (typeof this.size === 'string' && isNaN(this.size)) ? this.size : `${this.size}px`,
        }
      : {};
  }

  handleError() {
    const { error } = this;
    const errorFlag = error ? error() : undefined;
    if (errorFlag !== false) {
      this.isImageExist = false;
    }
  }

  render() {
    const { icon, src, isImageExist } = this;
    const avatarEl =
      isImageExist && src ? (
        <VImage
          src={src}
          fit="cover"
          class={this.avatarClasses}
          style={this.avatarStyles}
          alt={this.label}
          onError={this.handleError.bind(this)}
        />
      ) : (
        <span class={this.avatarClasses} style={this.avatarStyles}>
          {icon ? <i class={icon} /> : this.$slots.default}
        </span>
      );

    return this.label ? (
      <div class="vui-avatar-box" style={this.boxStyles}>
        {avatarEl}
        <span class={['vui-avatar__label', `vui-avatar__label--${this.labelPosition}`]} style={this.labelStyles}>
          {this.label}
        </span>
      </div>
    ) : (
      avatarEl
    );
  }
}
