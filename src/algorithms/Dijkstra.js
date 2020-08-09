import TinyQueue from 'tinyqueue';
import Pathfinder from './Pathfinder';

export default class Dijkstra extends Pathfinder {
  constructor(
    start,
    finish,
    board,
    updateNodeVisited,
    updateNodeShortest,
    iterativeDelay
  ) {
    super(
      start,
      finish,
      board,
      updateNodeVisited,
      updateNodeShortest,
      iterativeDelay
    );
    this.pq = new TinyQueue();
  }

  run() {}
}
