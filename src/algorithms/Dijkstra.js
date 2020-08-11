import TinyQueue from 'tinyqueue';
import Pathfinder from './Pathfinder';
import { NODE_WALL } from '../constants';

export default class Dijkstra extends Pathfinder {
  constructor(...args) {
    super(...args);
    this.pq = new TinyQueue([], function (a, b) {
      return a.d - b.d;
    });
  }

  // Dijkstra is a variant of A* where the heuristic is zero
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
    } = this;

    if (start.x === finish.x && start.y === finish.y) {
      return 0;
    }

    pq.push({ x: start.x, y: start.y, g: 0 });
    dist[start.y][start.x] = 0;

    while (pq.length) {
      const current = pq.pop();
      const currentX = current.x;
      const currentY = current.y;
      const currentG = current.g;

      closed[currentY][currentX] = true;

      for (let i = 0; i < Pathfinder.dx.length; ++i) {
        const nextX = currentX + Pathfinder.dx[i];
        const nextY = currentY + Pathfinder.dy[i];
        if (
          nextX < 0 ||
          nextX >= board[0].length ||
          nextY < 0 ||
          nextY >= board.length
        ) {
          continue;
        }
        if (closed[nextY][nextX] || board[nextY][nextX] === NODE_WALL) {
          continue;
        }

        updateNodeIsVisited(nextY, nextX, true);
        prev[nextY][nextX] = { x: currentX, y: currentY };
        if (nextX === finish.x && nextY === finish.y) {
          return this.traceShortestPath();
        }

        const weight = 1;
        const g = dist[currentY][currentX] + weight;
        // if there is a shorter path to nextPos
        if (g < dist[nextY][nextX]) {
          dist[nextY][nextX] = g;
          pq.push({ x: nextX, y: nextY, g });
        }
      }
    }
  }
}
