export default class Timer {
  constructor(callback, delay) {
    this.start = Date.now();
    this.id = setTimeout(callback, delay);
    this.callback = callback;
    this.remaining = delay;
  }

  pause = () => {
    clearTimeout(this.id);
    this.remaining -= Date.now() - this.start;
  };

  resume = () => {
    this.start = Date.now();
    clearTimeout(this.id);
    this.id = setTimeout(this.callback, this.remaining);
  };

  clear = () => {
    clearTimeout(this.id);
  };
}
