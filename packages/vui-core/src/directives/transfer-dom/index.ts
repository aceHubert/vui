// Thanks to: https://github.com/calebroseland/vue-dom-portal

import objectAssign from 'lodash.assign';

// Types
import { VNodeDirective } from 'vue/types/vnode';

interface TransferDomBindingArgs {
  updateConditional?: (node: TransferDomDirective['value'], oldNode: TransferDomDirective['value']) => boolean;
}

interface TransferDomDirective extends VNodeDirective {
  value?: string | boolean | InstanceType<Node>;
  args?: TransferDomBindingArgs;
}

/**
 * Get target DOM Node
 * @param {(Node|String|Boolean)} [node=document.body] DOM Node, CSS selector, or Boolean
 * @return {Node} The target that the el will be appended to
 */
function getTarget(node: TransferDomDirective['value']): HTMLElement {
  if (node === undefined) {
    return document.body;
  }

  if (typeof node === 'string' && node.indexOf('?') === 0) {
    return document.body;
  } else if (typeof node === 'string' && node.indexOf('?') > 0) {
    node = node.split('?')[0];
  }

  if (node === 'body' || node === true) {
    return document.body;
  }

  return node instanceof window.Node ? node : document.querySelector(node);
}

/**
 * Needs to update or not
 * @param {(Node|String|Boolean)} node DOM Node, CSS selector, or Boolean
 * @return {Boolean} shoule update
 */
function updateConditional(node: TransferDomDirective['value'], oldNode: TransferDomDirective['value']): boolean {
  // do not updated by default
  if (!node) {
    return false;
  }
  if (typeof node === 'string' && node.indexOf('?') > 0) {
    try {
      const config = JSON.parse(node.split('?')[1]);
      return config.autoUpdate || false;
    } catch (e) {
      return false;
    }
  }

  // if not equal
  return node !== oldNode;
}

export const TransferDom = {
  inserted(el: HTMLElement, { value }: TransferDomDirective) {
    el.className = el.className ? el.className + ' v-transfer-dom' : 'v-transfer-dom';
    const parentNode = el.parentNode;
    const home = document.createComment('');
    let hasMovedOut = false;

    if (value !== false) {
      parentNode!.replaceChild(home, el); // moving out, el is no longer in the document
      getTarget(value).appendChild(el); // moving into new place
      hasMovedOut = true;
    }
    if (!el.__transferDomData) {
      el.__transferDomData = {
        parentNode: parentNode!,
        home: home,
        target: getTarget(value),
        hasMovedOut: hasMovedOut,
      };
    }
  },
  componentUpdated(el: HTMLElement, { value, oldValue, args = {} }: TransferDomDirective) {
    // If no updateConditional was supplied assign a default
    const shouldUpdate = args.updateConditional || updateConditional;
    if (!shouldUpdate(value, oldValue)) return;

    // need to make sure children are done updating (vs. `update`)
    const ref$1 = el.__transferDomData!;
    const parentNode = ref$1.parentNode;
    const home = ref$1.home;
    const hasMovedOut = ref$1.hasMovedOut; // recall where home is

    if (!hasMovedOut && value) {
      // remove from document and leave placeholder
      parentNode.replaceChild(home, el);
      // append to target
      getTarget(value).appendChild(el);
      el.__transferDomData = objectAssign({}, el.__transferDomData, { hasMovedOut: true, target: getTarget(value) });
    } else if (hasMovedOut && value === false) {
      // previously moved, coming back home
      parentNode.replaceChild(el, home);
      el.__transferDomData = objectAssign({}, el.__transferDomData, { hasMovedOut: false, target: getTarget(value) });
    } else if (value) {
      // already moved, going somewhere else
      getTarget(value).appendChild(el);
    }
  },
  unbind(el: HTMLElement) {
    el.className = el.className.replace('v-transfer-dom', '');
    if (el.__transferDomData && el.__transferDomData.hasMovedOut === true) {
      el.__transferDomData.parentNode && el.__transferDomData.parentNode.appendChild(el);
    }
    el.__transferDomData = null;
  },
};

export default TransferDom;
