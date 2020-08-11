import TinyQueue from 'tinyqueue';
import Pathfinder from './Pathfinder';

export default class AStar extends Pathfinder {
  constructor(...args) {
    super(...args);
    this.pq = new TinyQueue();
  }

  run() {}
}
