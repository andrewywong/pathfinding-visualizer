import Timer from './Timer';
export default class Pathfinder {
  constructor(start, finish, board, updateNodeVisited, updateNodeShortest) {
    this.start = start;
    this.finish = finish;
    this.updateNodeVisited = updateNodeVisited;
    this.updateNodeShortest = updateNodeShortest;
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

  drawShortestPath = () => {};
}
