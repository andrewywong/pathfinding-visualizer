import TinyQueue from 'tinyqueue';
import Pathfinder from './Pathfinder';
import { NODE_WALL, WEIGHT_MAPPING } from '../constants';

export default class AStar extends Pathfinder {
  constructor(...args) {
    super(...args);
    this.pq = new TinyQueue([], function (a, b) {
      return a.f - b.f;
    });
  }

  // Manhattan distance
  calculateHeuristic = (posX, posY) => {
    return Math.abs(posX - this.finish.x) + Math.abs(posY - this.finish.y);
  };

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
      calculateHeuristic,
    } = this;

    let counter = 0;
    if (start.x === finish.x && start.y === finish.y) {
      return counter;
    }

    // f = g + h, initial g is 0
    const startF = calculateHeuristic(start.x, start.y);
    pq.push({ x: start.x, y: start.y, f: startF });
    dist[start.y][start.x] = 0;

    while (pq.length) {
      const current = pq.pop();
      const currentX = current.x;
      const currentY = current.y;

      if (closed[currentY][currentX]) {
        continue;
      }
      // Increment counter unless start node
      if (!(currentX === start.x && currentY === start.y)) counter += 1;
      closed[currentY][currentX] = true;
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

        const weight = !(nextX === finish.x && nextY === finish.y)
          ? WEIGHT_MAPPING[board[nextY][nextX].type]
          : 1;
        const g = dist[currentY][currentX] + weight;
        // f = g + h
        const nextF = g + calculateHeuristic(nextX, nextY);
        // if there is a shorter path to nextPos
        if (g < dist[nextY][nextX]) {
          dist[nextY][nextX] = g;
          prev[nextY][nextX] = { x: currentX, y: currentY };
          pq.push({ x: nextX, y: nextY, f: nextF });
        }
      }
    }

    return counter;
  }
}
