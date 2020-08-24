import Vue from 'vue';

const isServer = Vue.prototype.$isServer;

// 获取 element offset (防止position污染))
/* istanbul ignore next */
function getOffsetSum(el: HTMLElement) {
  let top = 0;
  let left = 0;
  let _el: HTMLElement | null = el;
  while (_el) {
    top += _el.offsetTop;
    left += _el.offsetLeft;
    _el = _el.offsetParent as any;
  }
  return {
    top: top,
    left: left,
  };
}

// 获取 page offset (包含 scroll)
/* istanbul ignore next */
function getOffsetRect(el: HTMLElement) {
  const box = el.getBoundingClientRect();
  const body = document.body;
  const docElem = document.documentElement;
  // 获取页面的scrollTop,scrollLeft(兼容性写法)
  const scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
  const scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
  const clientTop = docElem.clientTop || body.clientTop;
  const clientLeft = docElem.clientLeft || body.clientLeft;
  const top = box.top + scrollTop - clientTop;
  const left = box.left + scrollLeft - clientLeft;
  return {
    // Math.round 兼容火狐浏览器bug
    top: Math.round(top),
    left: Math.round(left),
  };
}

// 鼠标的距离body的offsetX/offsetY
/* istanbul ignore next */
export function pointer(event: MouseEvent) {
  if (isServer) return { left: 0, top: 0 };
  return {
    left: event.pageX || event.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft),
    top: event.pageY || event.clientY + (document.documentElement.scrollTop || document.body.scrollTop),
  };
}

// 获取组件距离body的offsetX/offsetY
/* istanbul ignore next */
export function getOffset(el: HTMLElement) {
  if (isServer) return { left: 0, top: 0 };
  // @ts-ignore
  if (el.getBoundingClientRect) {
    return getOffsetRect(el);
  } else {
    return getOffsetSum(el);
  }
}
