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

  static dx = [0, 0, -1, 1];
  static dy = [-1, 1, 0, 0];

  _init(board) {
    // this.board = [];
    this.dist = [];
    this.visited = [];
    this.prev = [];
    for (let i = 0; i < board.length; ++i) {
      // this.board[i] = [];
      this.dist[i] = [];
      this.visited[i] = [];
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

  clearTimers = () => {
    this.timers.forEach((timer) => {
      timer.clear();
    });
    this.timers = [];
  };

  pauseTimers = () => {
    this.timers.forEach((timer) => timer.pause());
  };

  resumeTimers = () => {
    this.timers.forEach((timer) => timer.resume());
  };

  // returns latest timeCounter
  traceShortestPath = (timeCounter) => {
    const { finish, prev, updateNodeIsShortest } = this;

    const path = [];
    let { x, y } = prev[finish.y][finish.x];

    while (prev[y][x].x !== -1 && prev[y][x].y !== -1) {
      path.push({ x, y });
      const tempX = x;
      const tempY = y;
      x = prev[tempY][tempX].x;
      y = prev[tempY][tempX].y;
    }

    for (let i = path.length - 1; i >= 0; --i) {
      x = path[i].x;
      y = path[i].y;
      if (this.delayIteration) {
        updateNodeIsShortest(y, x, true, timeCounter);
      } else {
        updateNodeIsShortest(y, x, true);
      }

      timeCounter += 1;
    }
    return timeCounter;
  };
}
