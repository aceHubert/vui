import Vue from 'vue';

const isServer = Vue.prototype.$isServer;
const SPECIAL_CHARS_REGEXP = /([\\:\-\\_]+(.))/g;
const MOZ_HACK_REGEXP = /^moz([A-Z])/;
const ieVersion = isServer ? 0 : Number((document as any).documentMode);

/* istanbul ignore next */
const trim = function (str: string) {
  return (str || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
};

/* istanbul ignore next */
const camelCase = function (name: string) {
  return name
    .replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
      return offset ? letter.toUpperCase() : letter;
    })
    .replace(MOZ_HACK_REGEXP, 'Moz$1');
};

/* istanbul ignore next */
export function hasClass(el: HTMLElement, className: string) {
  if (isServer || !el || !className) return false;
  if (className.indexOf(' ') !== -1) throw new Error('className should not contain space.');
  if (el.classList) {
    return el.classList.contains(className);
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + className + ' ') > -1;
  }
}

/* istanbul ignore next */
export function addClass(el: HTMLElement, classNames: string) {
  if (isServer || !el || !classNames) return;
  let curClass = el.className;
  const classes = (classNames || '').split(' ');

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.add(clsName);
    } else {
      if (!hasClass(el, clsName)) {
        curClass += ' ' + clsName;
      }
    }
  }
  if (!el.classList) {
    el.className = curClass;
  }
}

/* istanbul ignore next */
export function removeClass(el: HTMLElement, classNames: string) {
  if (isServer || !el || !classNames) return;
  const classes = classNames.split(' ');
  let curClass = ' ' + el.className + ' ';

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.remove(clsName);
    } else {
      if (hasClass(el, clsName)) {
        curClass = curClass.replace(' ' + clsName + ' ', ' ');
      }
    }
  }
  if (!el.classList) {
    el.className = trim(curClass);
  }
}

/* istanbul ignore next */
export function toggleClass(el: HTMLElement, className: string) {
  if (hasClass(el, className)) {
    removeClass(el, className);
  } else {
    addClass(el, className);
  }
}

// 获取样式兼容性函数
/* istanbul ignore next */
export const getStyle =
  ieVersion < 9
    ? function (el: HTMLElement, styleName: string) {
        if (isServer) return;
        if (!el || !styleName) return null;
        styleName = camelCase(styleName);
        if (styleName === 'float') {
          styleName = 'styleFloat';
        }
        try {
          switch (styleName) {
            case 'opacity':
              try {
                return (el as any).filters.item('alpha').opacity / 100;
              } catch (e) {
                return 1.0;
              }
            default:
              return (el.style as any)[styleName] || (el as any).currentStyle
                ? (el as any).currentStyle[styleName]
                : null;
          }
        } catch (e) {
          return (el.style as any)[styleName];
        }
      }
    : function (el: HTMLElement, styleName: string) {
        if (isServer) return;
        if (!el || !styleName) return null;
        styleName = camelCase(styleName);
        if (styleName === 'float') {
          styleName = 'cssFloat';
        }
        try {
          const computed = document.defaultView?.getComputedStyle(el, '');
          return (el.style as any)[styleName] || computed ? (computed as any)[styleName] : null;
        } catch (e) {
          return (el.style as any)[styleName];
        }
      };

// 设置样式
/* istanbul ignore next */
export function setStyle(el: HTMLElement, styleName: string | { [key: string]: any }, value?: any) {
  if (isServer || !el || !styleName) return;

  if (typeof styleName === 'object') {
    for (const prop in styleName) {
      // eslint-disable-next-line no-prototype-builtins
      if (styleName.hasOwnProperty(prop)) {
        setStyle(el, prop, styleName[prop]);
      }
    }
  } else {
    styleName = camelCase(styleName);
    if (styleName === 'opacity' && ieVersion < 9) {
      el.style.filter = isNaN(value) ? '' : 'alpha(opacity=' + value * 100 + ')';
    } else {
      (el.style as any)[styleName] = value;
    }
  }
}

/* istanbul ignore next */
export const loadStyleString = (cssText: string, id: string = '') => {
  if (document.getElementById(id)) return;
  const style = document.createElement('style');
  style.type = 'text/css';
  style.id = id;
  try {
    style.appendChild(document.createTextNode(cssText));
  } catch (ex) {
    (style as any).styleSheet.cssText = cssText;
  }
  const head = document.getElementsByTagName('head')[0];
  head.appendChild(style);
};
