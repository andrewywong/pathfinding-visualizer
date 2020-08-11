import Denque from 'denque';
import Pathfinder from './Pathfinder';
import { NODE_WALL } from '../constants';

export default class DepthFirstSearch extends Pathfinder {
  constructor(...args) {
    super(...args);
    this.stk = new Denque();
  }

  run() {
    const {
      stk,
      visited,
      prev,
      board,
      start,
      finish,
      updateNodeIsVisited,
    } = this;

    let counter = 0;
    if (start.x === finish.x && start.y === finish.y) {
      return counter;
    }

    const dxReverse = [0, 0, -1, 1];
    const dyReverse = [-1, 1, 0, 0];

    stk.push({ x: start.x, y: start.y });
    while (stk.length) {
      const current = stk.pop();
      const currentX = current.x;
      const currentY = current.y;

      if (visited[currentY][currentX]) {
        continue;
      }
      counter += 1;
      visited[currentY][currentX] = true;
      if (currentX === finish.x && currentY === finish.y) {
        return this.traceShortestPath(counter);
      }
      // Don't update node-visited for start/finish nodes
      if (!(currentX === start.x && currentY === start.y)) {
        updateNodeIsVisited(currentY, currentX, true, counter);
      }

      for (let i = 0; i < dxReverse.length; ++i) {
        const nextX = current.x + dxReverse[i];
        const nextY = current.y + dyReverse[i];
        if (
          nextX < 0 ||
          nextX >= board[0].length ||
          nextY < 0 ||
          nextY >= board.length
        ) {
          continue;
        }
        if (visited[nextY][nextX] || board[nextY][nextX] === NODE_WALL) {
          continue;
        }

        prev[nextY][nextX] = { x: current.x, y: current.y };
        stk.push({ x: nextX, y: nextY });
      }
    }
    return counter;
  }
}
