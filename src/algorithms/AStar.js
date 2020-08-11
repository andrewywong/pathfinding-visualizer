import TinyQueue from 'tinyqueue';
import Pathfinder from './Pathfinder';

export default class AStar extends Pathfinder {
  constructor(...args) {
    super(...args);
    this.pq = new TinyQueue([], function (a, b) {
      return a.f - b.f;
    });
  }

  // Manhattan distance
  calculateHeuristic(nodePos) {
    return (
      Math.abs(nodePos.x - this.finish.x) + Math.abs(nodePos.y - this.finish.y)
    );
  }

  run() {
    const {
      pq,
      dist,
      closed,
      prev,
      board,
      start,
      finish,
      updateNodeIsVisited,
      calculateHeuristic,
    } = this;

    let counter = 0;
    if (start.x === finish.x && start.y === finish.y) {
      return counter;
    }
    counter += 1;

    return counter;
  }
}
