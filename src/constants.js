// Node Types
export const NODE_START = 'node-start';
export const NODE_FINISH = 'node-finish';
export const NODE_INITIAL = 'node-initial';
export const NODE_WALL = 'node-wall';

export const NODE_VISITED = 'node-visited';
export const NODE_SHORTEST = 'node-shortest-path';

export const NODE_LIGHT = 'node-light';
export const NODE_MEDIUM = 'node-medium';
export const NODE_HEAVY = 'node-heavy';

export const DRAW_TYPES = [NODE_WALL, NODE_LIGHT, NODE_MEDIUM, NODE_HEAVY];

// Delay Interval
export const DELAY_SLOW = 150;
export const DELAY_NORMAL = 50;
export const DELAY_FAST = 25;

export const DELAY_SPEEDS = [DELAY_SLOW, DELAY_NORMAL, DELAY_FAST];

// Pathfinding Algorithms
export const DIJKSTRA = 'Dijkstra';
export const A_STAR = 'A*';
export const BFS = 'BFS';
export const DFS = 'DFS';

export const ALGORITHM_TYPES = [DIJKSTRA, A_STAR, BFS, DFS];

// Editing Modes
export const IDLE = 'idle';
export const DRAGGING_START = 'dragging-start';
export const DRAGGING_FINISH = 'dragging-finish';
export const DRAWING = 'drawing';
export const ERASING = 'erasing';

// Node Weight Mapping
export const WeightMapping = {
  [NODE_INITIAL]: 1,
  [NODE_WALL]: Infinity,
  [NODE_LIGHT]: 10,
  [NODE_MEDIUM]: 30,
  [NODE_HEAVY]: 50,
};

// Draw Name Mapping
export const DrawMapping = {
  [NODE_INITIAL]: 'None',
  [NODE_WALL]: 'Wall',
  [NODE_LIGHT]: 'Light',
  [NODE_MEDIUM]: 'Medium',
  [NODE_HEAVY]: 'Heavy',
};

// Delay Name Mapping
export const DelayMapping = {
  [DELAY_SLOW]: 'Slow',
  [DELAY_NORMAL]: 'Normal',
  [DELAY_FAST]: 'Fast',
};

// Algorithm Name Mapping
export const AlgorithmMapping = {
  [DIJKSTRA]: "Dijkstra's algorithm",
  [A_STAR]: 'A* search',
  [BFS]: 'Breadth-first search',
  [DFS]: 'Depth-first search',
};
