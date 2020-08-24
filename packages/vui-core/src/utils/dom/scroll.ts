import Vue from 'vue';
import { getStyle } from './style';

const isServer = Vue.prototype.$isServer;

// 获取 scrollTop
/* istanbul ignore next */
export function getScrollTop(el?: HTMLElement | (Window & typeof globalThis)) {
  if (isServer) return 0;
  let scrollTop = 0;
  if (!el || el === window) {
    let bodyScrollTop = 0;
    let documentScrollTop = 0;
    if (document.body) {
      bodyScrollTop = document.body.scrollTop;
    }
    if (document.documentElement) {
      documentScrollTop = document.documentElement.scrollTop;
    }
    scrollTop = bodyScrollTop - documentScrollTop > 0 ? bodyScrollTop : documentScrollTop;
  } else {
    scrollTop = (el as HTMLElement).scrollTop;
  }
  return scrollTop;
}

// 获取 scrollHeight
/* istanbul ignore next */
export function getScrollHeight(el?: HTMLElement | (Window & typeof globalThis)) {
  if (isServer) return 0;
  let scrollHeight = 0;
  if (!el || el === window) {
    let bodyScrollHeight = 0;
    let documentScrollHeight = 0;
    if (document.body) {
      bodyScrollHeight = document.body.scrollHeight;
    }
    if (document.documentElement) {
      documentScrollHeight = document.documentElement.scrollHeight;
    }
    scrollHeight = bodyScrollHeight - documentScrollHeight > 0 ? bodyScrollHeight : documentScrollHeight;
  } else {
    scrollHeight = (el as HTMLElement).scrollHeight;
  }
  return scrollHeight;
}

// 获取 clientHeight
/* istanbul ignore next */
export function getClientHeight(el?: HTMLElement | (Window & typeof globalThis)) {
  if (isServer) return 0;
  let height = 0;
  if (!el || el === window) {
    if (document.compatMode === 'CSS1Compat') {
      height = document.documentElement.clientHeight;
    } else {
      height = document.body.clientHeight;
    }
  } else {
    height = (el as HTMLElement).clientHeight;
  }
  return height;
}

// 获取 offsetHeight
/* istanbul ignore next */
export function getOffsetHeight(el?: HTMLElement | (Window & typeof globalThis)) {
  if (isServer) return 0;
  let height = 0;
  if (!el || el === window) {
    if (document.compatMode === 'CSS1Compat') {
      height = document.documentElement.offsetHeight;
    } else {
      height = document.body.offsetHeight;
    }
  } else {
    height = (el as HTMLElement).offsetHeight;
  }
  return height;
}

/* istanbul ignore next */
export const isScroll = (el: HTMLElement, vertical?: boolean) => {
  if (isServer) return;

  const determinedDirection = vertical !== null || vertical !== undefined;
  const overflow = determinedDirection
    ? vertical
      ? getStyle(el, 'overflow-y')
      : getStyle(el, 'overflow-x')
    : getStyle(el, 'overflow');

  return overflow.match(/(scroll|auto)/);
};

/* istanbul ignore next */
export const getScrollContainer = (el: HTMLElement, vertical?: boolean) => {
  if (isServer) return;

  let parent: (Node & ParentNode) | null = el;
  while (parent) {
    if ([window, document, document.documentElement].includes(parent as any)) {
      return window;
    }
    if (isScroll(parent as HTMLElement, vertical)) {
      return parent;
    }
    parent = parent.parentNode;
  }

  return parent;
};

/* istanbul ignore next */
export const isInContainer = (el: Element, container: HTMLElement) => {
  if (isServer || !el || !container) return false;

  const elRect = el.getBoundingClientRect();
  let containerRect;

  if ([window, document, document.documentElement, null, undefined].includes(container)) {
    containerRect = {
      top: 0,
      right: window.innerWidth,
      bottom: window.innerHeight,
      left: 0,
    };
  } else {
    containerRect = container.getBoundingClientRect();
  }

  return (
    elRect.top < containerRect.bottom &&
    elRect.bottom > containerRect.top &&
    elRect.right > containerRect.left &&
    elRect.left < containerRect.right
  );
};

/* istanbul ignore next */
export function scrollIntoView(
  container: HTMLElement,
  selected: HTMLElement,
  options: { behavior?: 'smooth' | 'auto'; duration?: number } = { behavior: 'smooth', duration: 15 },
) {
  if (isServer || !container) return;

  if (!selected || container === selected) {
    return scrollTo(container, { ...options, top: 0 });
  }

  const top = selected.offsetTop;
  const bottom = selected.offsetTop + selected.offsetHeight;
  const viewRectTop = getScrollTop(container);
  const viewRectHeight = getClientHeight(container);
  const viewRectBottom = viewRectTop + viewRectHeight;

  if (top < viewRectTop) {
    scrollTo(container, { ...options, top });
  } else if (bottom > viewRectBottom) {
    scrollTo(container, { ...options, top: bottom - viewRectHeight });
  }
}

// function easeIn(currentTime: number, startValue: number, changeValue: number, duration: number) {
//   currentTime /= duration;
//   return changeValue * currentTime * currentTime + startValue;
// }

// function easeOut (currentTime: number, startValue: number, changeValue: number, duration: number) {
//   currentTime /= duration
//   return -changeValue * currentTime * (currentTime - 2) + startValue
// }

function easeInOut(currentTime: number, startValue: number, changeValue: number, duration: number) {
  currentTime /= duration / 2;
  if (currentTime < 1) return (changeValue / 2) * currentTime * currentTime + startValue;
  currentTime--;
  return (-changeValue / 2) * (currentTime * (currentTime - 2) - 1) + startValue;
}

/**
 * scrollTo
 * @param {HTMLElement} container
 * @param {{ behavior: string, top: number, duration: number }} options {behavior:'smooth', top: 0, duration: 60}
 */
/* istanbul ignore next */
export function scrollTo(
  container: HTMLElement,
  options: { behavior?: 'smooth' | 'auto'; top?: number; duration?: number } = {},
) {
  if (isServer || !container) return;

  if ([window, document, document.documentElement, null, undefined].includes(container)) {
    window.scrollTo({ top: 0, ...options });
  } else if (options.behavior === 'smooth') {
    let count = 0;
    const top = options.top || 0;
    const scrollTop = container.scrollTop;
    const scrollDuration = options.duration || 60;
    // scroll animation
    const scroll = () => {
      if (top === scrollTop) return;

      if (top > scrollTop) {
        // down
        const distance = easeInOut(count, scrollTop, top - scrollTop, scrollDuration - 1);
        container.scrollTop = distance;
      } else {
        // up
        const distance = easeInOut(count, -scrollTop, scrollTop - top, scrollDuration - 1);
        container.scrollTop = -distance;
      }

      if (++count < scrollDuration) {
        window.requestAnimationFrame(scroll);
      }
    };
    window.requestAnimationFrame(scroll);
  } else {
    container.scrollTop = options.top || 0;
  }
}
