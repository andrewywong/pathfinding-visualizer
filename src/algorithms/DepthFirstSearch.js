import Denque from 'denque';
import Pathfinder from './Pathfinder';
import { NODE_WALL } from '../constants';

export default class DepthFirstSearch extends Pathfinder {
  constructor(...args) {
    super(...args);
    this.stk = new Denque();
  }

  run() {}
}
