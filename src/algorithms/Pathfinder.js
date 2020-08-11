import Timer from './Timer';
export default class Pathfinder {
  constructor(
    board,
    start,
    finish,
    updateNodeIsVisited,
    updateNodeIsShortest,
    delayIteration
  ) {
    this.start = start;
    this.finish = finish;
    this.updateNodeIsVisited = updateNodeIsVisited;
    this.updateNodeIsShortest = updateNodeIsShortest;
    this.delayIteration = delayIteration;
    this._init(board);
    this.board = board;
    this.timers = [];
  }

  static dx = [0, 0, 1, -1];
  static dy = [1, -1, 0, 0];

  _init(board) {
    // this.board = [];
    this.dist = [];
    this.visited = [];
    this.prev = [];
    for (let i = 0; i < board.length; ++i) {
      // this.board[i] = [];
      this.prev[i] = [];
      for (let j = 0; j < board[i].length; ++j) {
        // this.board[i][j] = { type: board[i][j].type };
        this.dist[i][j] = Infinity;
        this.visited[i][j] = false;
        this.prev[i][j] = { x: -1, y: -1 };
      }
    }
    this.closed = this.visited;
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
  traceShortestPath = (timeCounter) => {};
}
