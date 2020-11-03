/**
 * calculate-change
 */

export default function calculateChange(e: Event, props: any, container: HTMLElement) {
  e.preventDefault();
  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;
  const x = typeof (e as MouseEvent).pageX === 'number' ? (e as MouseEvent).pageX : (e as TouchEvent).touches[0].pageX;
  const y = typeof (e as MouseEvent).pageY === 'number' ? (e as MouseEvent).pageY : (e as TouchEvent).touches[0].pageY;
  const left = x - (container.getBoundingClientRect().left + window.pageXOffset);
  const top = y - (container.getBoundingClientRect().top + window.pageYOffset);

  if (props.direction === 'vertical') {
    let offset;
    if (top < 0) {
      offset = 100;
    } else if (top > containerHeight) {
      offset = 0;
    } else {
      offset = 100 - (top * 100) / containerHeight;
    }
    return offset;
  } else {
    let offset;
    if (left < 0) {
      offset = 0;
    } else if (left > containerWidth) {
      offset = 100;
    } else {
      offset = (left * 100) / containerWidth;
    }
    return offset;
  }
}
