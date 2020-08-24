/**
 * clean-style
 */

export default (styles: { [key: string]: any } = {}) => {
  for (const i in styles) {
    if (typeof styles[i] === 'undefined') {
      delete styles[i];
    }
  }
  return styles;
};
