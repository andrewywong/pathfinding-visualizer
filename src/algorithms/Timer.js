export default class Timer {
  constructor(callback, delay) {
    this.id = setTimeout(callback, delay);
    this.start = delay; // Date.now()
    this.delay = delay;
    this.remaining = delay;
  }

  pause = () => {
    clearTimeout(this.id);
    this.remaining -= Date.now() - this.start;
  };

  resume = () => {
    this.start = Date.now();
    clearTimeout(this.timerId);
    this.id = setTimeout(this.callback, this.remaining);
  };

  clear = () => {
    clearTimeout(this.id);
  };
}
