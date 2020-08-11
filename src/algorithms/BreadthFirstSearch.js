import Denque from 'denque';
import Pathfinder from './Pathfinder';
import { NODE_WALL } from '../constants';

export default class BreadthFirstSearch extends Pathfinder {
  constructor(...args) {
    super(...args);
    this.q = new Denque();
  }

  run() {
    const {
      q,
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

    q.push({ x: start.x, y: start.y });
    visited[start.y][start.x] = true;
    while (q.length) {
      const current = q.shift();

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
        if (visited[nextY][nextX] || board[nextY][nextX] === NODE_WALL) {
          continue;
        }

        counter += 1;
        visited[nextY][nextX] = true;
        prev[nextY][nextX] = { x: current.x, y: current.y };
        if (nextX === finish.x && nextY === finish.y) {
          return this.traceShortestPath(counter);
        }
        updateNodeIsVisited(nextY, nextX, true, counter);
        q.push({ x: nextX, y: nextY });
      }
    }
    return counter;
  }
}
