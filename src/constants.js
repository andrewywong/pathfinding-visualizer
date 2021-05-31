// Node Types
export const NODE_START = 'node-start';
export const NODE_FINISH = 'node-finish';
export const NODE_INITIAL = 'node-initial';
export const NODE_WALL = 'node-wall';

export const NODE_VISITED = 'node-visited';
export const NODE_SHORTEST = 'node-shortest-path';

export const NODE_WEIGHT_10 = 'node-weight-10';
export const NODE_WEIGHT_20 = 'node-weight-20';
export const NODE_WEIGHT_30 = 'node-weight-30';
export const NODE_WEIGHT_40 = 'node-weight-40';
export const NODE_WEIGHT_50 = 'node-weight-50';

// Delay Interval
export const DELAY_SLOW = 200;
export const DELAY_NORMAL = 50;
export const DELAY_FAST = 20;

export const DELAY_SPEEDS = [
  { value: DELAY_SLOW, name: 'Slow' },
  { value: DELAY_NORMAL, name: 'Normal' },
  { value: DELAY_FAST, name: 'Fast' },
];

// Pathfinding Algorithms
export const DIJKSTRA = 'dijkstra';
export const A_STAR = 'a-star';
export const BFS = 'BFS';
export const DFS = 'DFS';

export const ALGORITHM_TYPES = [
  { value: DIJKSTRA, name: "Dijkstra's algorithm" },
  { value: A_STAR, name: 'A* search' },
  { value: BFS, name: 'Breadth-first search' },
  { value: DFS, name: 'Depth-first search' },
];

// Editing Modes
export const IDLE = 'idle';
export const DRAGGING_START = 'dragging-start';
export const DRAGGING_FINISH = 'dragging-finish';
export const DRAWING = 'drawing';
export const ERASING = 'erasing';

// Node Weight Mapping
export const WEIGHT_MAPPING = {
  [NODE_INITIAL]: 1,
  [NODE_WEIGHT_10]: 10,
  [NODE_WEIGHT_20]: 20,
  [NODE_WEIGHT_30]: 30,
  [NODE_WEIGHT_40]: 40,
  [NODE_WEIGHT_50]: 50,
  [NODE_WALL]: 60, // Conceptually Infinity
};

// Node Weight Reverse Mapping
export const WEIGHT_REVERSE = {};
WEIGHT_REVERSE[10] = NODE_WEIGHT_10;
WEIGHT_REVERSE[20] = NODE_WEIGHT_20;
WEIGHT_REVERSE[30] = NODE_WEIGHT_30;
WEIGHT_REVERSE[40] = NODE_WEIGHT_40;
WEIGHT_REVERSE[50] = NODE_WEIGHT_50;
WEIGHT_REVERSE[60] = NODE_WALL;

// Marks array for weight/wall slider
export const MARKS = [
  {
    value: 10,
    label: '10',
  },
  {
    value: 20,
    label: '20',
  },
  {
    value: 30,
    label: '30',
  },
  {
    value: 40,
    label: '40',
  },
  {
    value: 50,
    label: '50',
  },
  {
    value: 60,
    label: 'Wall',
  },
];
