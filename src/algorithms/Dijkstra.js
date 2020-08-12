import TinyQueue from 'tinyqueue';
import Pathfinder from './Pathfinder';
import { NODE_WALL } from '../constants';

export default class Dijkstra extends Pathfinder {
  constructor(...args) {
    super(...args);
    this.pq = new TinyQueue([], function (a, b) {
      return a.g - b.g;
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
      delayedIteration,
    } = this;

    let counter = 0;
    if (start.x === finish.x && start.y === finish.y) {
      return counter;
    }

    pq.push({ x: start.x, y: start.y, g: 0 });
    dist[start.y][start.x] = 0;

    while (pq.length) {
      const current = pq.pop();
      const currentX = current.x;
      const currentY = current.y;
      // const currentG = current.g;

      if (closed[currentY][currentX]) {
        continue;
      }
      counter += 1;
      closed[currentY][currentX] = true;
      if (currentX === finish.x && currentY === finish.y) {
        return this.traceShortestPath(counter);
      }
      // Don't update node-visited for start/finish nodes
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
        if (closed[nextY][nextX]) {
          continue;
        }
        if (
          board[nextY][nextX].type === NODE_WALL &&
          !(nextX === finish.x && nextY === finish.y)
        ) {
          continue;
        }

        const weight = 1;
        const g = dist[currentY][currentX] + weight;
        // if there is a shorter path to nextPos
        if (g < dist[nextY][nextX]) {
          dist[nextY][nextX] = g;
          prev[nextY][nextX] = { x: currentX, y: currentY };
          pq.push({ x: nextX, y: nextY, g });
        }
      }
    }
    return counter;
  }
}
