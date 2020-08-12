// Node Types
export const NODE_START = 'node-start';
export const NODE_FINISH = 'node-finish';
export const NODE_INITIAL = 'node-initial';
export const NODE_WALL = 'node-wall';

export const NODE_VISITED = 'node-visited';
export const NODE_SHORTEST = 'node-shortest-path';

// Delay Interval
export const DELAY_SLOW = 150;
export const DELAY_NORMAL = 50;
export const DELAY_FAST = 25;

// Pathfinding Algorithms
export const DIJKSTRA = 'Dijkstra';
export const A_STAR = 'A*';
export const DFS = 'DFS';
export const BFS = 'BFS';

export const ALGORITHM_TYPES = [DIJKSTRA, A_STAR, DFS, BFS];

// Editing Modes
export const IDLE = 'idle';
export const DRAGGING_START = 'dragging-start';
export const DRAGGING_FINISH = 'dragging-finish';
export const DRAWING = 'drawing';
export const ERASING = 'erasing';
