import { DELAY_SLOW } from '../constants';

export default class Timer {
  constructor(callback, delay) {
    this.id = setTimeout(callback, delay);
    this.callback = callback;
    this.start = Date.now();
    this.delay = delay;
    this.remaining = delay;
  }

  pause = () => {
    if (this.remaining >= -DELAY_SLOW) {
      clearTimeout(this.id);
      this.remaining -= Date.now() - this.start;
    }
  };

  resume = () => {
    this.start = Date.now();
    clearTimeout(this.id);
    // console.log('Start: ' + this.start);
    // console.log('Remaining: ' + this.remaining);
    if (this.remaining >= -DELAY_SLOW) {
      this.id = setTimeout(this.callback, this.remaining);
      // console.log('Called SetTimeout');
    }
  };

  clear = () => {
    clearTimeout(this.id);
  };
}
