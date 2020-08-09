import Queue from 'queue-fifo';
import Pathfinder from './Pathfinder';

export default class BreadthFirstSearch extends Pathfinder {
  constructor(start, finish, board, updateNodeVisited, updateNodeShortest) {
    super(start, finish, board, updateNodeVisited, updateNodeShortest);
    this.q = new Queue();
  }
}
