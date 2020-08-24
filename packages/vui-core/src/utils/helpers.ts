export function clamp(value: number, min = 0, max = 1) {
  return Math.max(min, Math.min(max, value));
}

export function padEnd(str: string, length: number, char = '0') {
  return str + char.repeat(Math.max(0, length - str.length));
}

export function chunk(str: string, size = 1) {
  const chunked: string[] = [];
  let index = 0;
  while (index < str.length) {
    chunked.push(str.substr(index, size));
    index += size;
  }
  return chunked;
}
