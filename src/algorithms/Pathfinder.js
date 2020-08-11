import Timer from './Timer';
export default class Pathfinder {
  constructor(
    start,
    finish,
    board,
    updateNodeVisited,
    updateNodeShortest,
    delayIteration
  ) {
    this.start = start;
    this.finish = finish;
    this.updateNodeVisited = updateNodeVisited;
    this.updateNodeShortest = updateNodeShortest;
    this.delayIteration = delayIteration;
    this._init(board);
    this.timers = [];
  }

  static dx = [0, 0, 1, -1];
  static dy = [1, -1, 0, 0];

  _init(board) {
    this.board = [];
    this.prev = [];
    for (let i = 0; i < board.length; ++i) {
      this.board[i] = [];
      this.prev[i] = [];
      for (let j = 0; j < board[i].length; ++j) {
        this.board[i][j] = { type: board[i][j].type };
        this.prev[i][j] = { x: -1, y: -1 };
      }
    }
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
