import Dijkstra from './algorithms/Dijkstra';
import AStar from './algorithms/AStar';
import BreadthFirstSearch from './algorithms/BreadthFirstSearch';
import DepthFirstSearch from './algorithms/DepthFirstSearch';
import {
  DIJKSTRA,
  A_STAR,
  BFS,
  DFS,
  DELAY_SLOW,
  DELAY_NORMAL,
  DELAY_FAST,
} from './constants';

const PathfinderMapping = {
  [DIJKSTRA]: Dijkstra,
  [A_STAR]: AStar,
  [BFS]: BreadthFirstSearch,
  [DFS]: DepthFirstSearch,
};

const AlgorithmMapping = {
  [DIJKSTRA]: "Dijkstra's algorithm",
  [A_STAR]: 'A* search',
  [BFS]: 'Breadth-first search',
  [DFS]: 'Depth-first search',
};

const DelayMapping = {
  [DELAY_SLOW]: 'Slow',
  [DELAY_NORMAL]: 'Normal',
  [DELAY_FAST]: 'Fast',
};

export { PathfinderMapping, AlgorithmMapping, DelayMapping };
