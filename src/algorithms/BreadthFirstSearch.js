import Pathfinder from './Pathfinder';

export default class BreadthFirstSearch extends Pathfinder {
  constructor(start, finish, board, updateNodeVisited, updateNodeShortest) {
    super(start, finish, board, updateNodeVisited, updateNodeShortest);
  }
}
