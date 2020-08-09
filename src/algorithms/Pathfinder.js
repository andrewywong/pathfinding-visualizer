import Timer from './Timer';
export default class Pathfinder {
  constructor(
    start,
    finish,
    board,
    updateNodeVisited,
    updateNodeShortest,
    hasDelay = true
  ) {
    this.start = start;
    this.finish = finish;
    this.updateNodeVisited = updateNodeVisited;
    this.updateNodeShortest = updateNodeShortest;
    this.hasDelay = hasDelay;
    this.board = board;
    this.timers = [];
  }

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
