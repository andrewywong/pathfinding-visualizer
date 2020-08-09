import Timer from './Timer';
export default class Pathfinder {
  constructor(
    start,
    finish,
    board,
    updateNodeVisited,
    updateNodeShortest,
    iterativeDelay
  ) {
    this.start = start;
    this.finish = finish;
    this.updateNodeVisited = updateNodeVisited;
    this.updateNodeShortest = updateNodeShortest;
    this.iterativeDelay = iterativeDelay;
    this.board = board;
    this.timers = [];
  }

  static dx = [0, 0, 1, -1];
  static dy = [1, -1, 0, 0];

  clearTimers() {
    this.timers.forEach((timer) => {
      timer.clear();
    });
    this.timers = [];
  }

  pauseTimers() {
    this.timers.forEach((timer) => timer.pause());
  }

  resumeTimers() {
    this.timers.forEach((timer) => timer.resume());
  }

  // returns latest timeCounter
  drawShortestPath = (timeCounter) => {};
}
