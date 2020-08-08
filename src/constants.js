// Node Types
export const NODE_START = 'node-start';
export const NODE_FINISH = 'node-finish';
export const NODE_INITIAL = 'node-initial';
export const NODE_WALL = 'node-wall';

export const NODE_VISITED = 'node-visited';
export const NODE_SHORTEST = 'node-shortest-path';

export const NODE_TYPES = [
  'start',
  'finish',
  'initial',
  'wall',
  'visited',
  'shortest',
];

// Delay Interval
export const DELAY_SLOW = 300;
export const DELAY_NORMAL = 150;
export const DELAY_FAST = 50;

// Algorithms
export const DIJKSTRA = 'dijkstra';
export const A_STAR = 'a-star';
export const DFS = 'DFS';
export const BFS = 'BFS';

// Modes
export const EDITING_MODES = {
  IDLE: 'idle',
  DRAGGING_START: 'dragging-start',
  DRAGGING_FINISH: 'dragging-finish',
  DRAWING: 'drawing',
  ERASING: 'erasing',
};
