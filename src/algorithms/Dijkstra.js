import TinyQueue from 'tinyqueue';
import Pathfinder from './Pathfinder';

export default class Dijkstra extends Pathfinder {
  constructor(start, finish, board, updateNodeVisited, updateNodeShortest) {
    super(start, finish, board, updateNodeVisited, updateNodeShortest);
    this.priorityQueue = new TinyQueue();
  }

  run() {}
}
