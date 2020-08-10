import Queue from 'queue-fifo';
import Pathfinder from './Pathfinder';

export default class BreadthFirstSearch extends Pathfinder {
  constructor(...args) {
    super(...args);
    this.q = new Queue();
  }

  run() {}
}
