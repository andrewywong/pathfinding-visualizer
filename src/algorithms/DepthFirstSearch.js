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
      delayedIteration,
    } = this;

    let counter = 0;
    if (start.x === finish.x && start.y === finish.y) {
      return counter;
    }

    stk.push({ x: start.x, y: start.y });
    while (!stk.isEmpty()) {
      const current = stk.pop();
      const currentX = current.x;
      const currentY = current.y;

      if (visited[currentY][currentX]) {
        continue;
      }
      // Increment counter unless start node
      if (!(currentX === start.x && currentY === start.y)) counter += 1;
      visited[currentY][currentX] = true;
      if (currentX === finish.x && currentY === finish.y) {
        return this.traceShortestPath(counter);
      }
      // Don't visually update node-visited for start/finish nodes
      if (!(currentX === start.x && currentY === start.y)) {
        updateNodeIsVisited(
          currentY,
          currentX,
          true,
          counter * delayedIteration,
          delayedIteration
        );
      }

      for (let i = 0; i < Pathfinder.dx.length; ++i) {
        const nextX = current.x + Pathfinder.dx[i];
        const nextY = current.y + Pathfinder.dy[i];
        if (
          nextX < 0 ||
          nextX >= board[0].length ||
          nextY < 0 ||
          nextY >= board.length
        ) {
          continue;
        }
        if (visited[nextY][nextX]) {
          continue;
        }
        if (
          board[nextY][nextX].type === NODE_WALL &&
          !(nextX === finish.x && nextY === finish.y)
        ) {
          continue;
        }

        prev[nextY][nextX] = { x: current.x, y: current.y };
        stk.push({ x: nextX, y: nextY });
      }
    }
    return counter;
  }
}
