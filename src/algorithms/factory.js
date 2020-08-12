import Dijkstra from './Dijkstra';
import AStar from './AStar';
import BreadthFirstSearch from './BreadthFirstSearch';
import DepthFirstSearch from './DepthFirstSearch';
import { DIJKSTRA, A_STAR, BFS, DFS } from '../constants';

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

export { PathfinderMapping, AlgorithmMapping };
