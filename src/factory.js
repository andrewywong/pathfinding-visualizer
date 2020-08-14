import Dijkstra from './algorithms/Dijkstra';
import AStar from './algorithms/AStar';
import BreadthFirstSearch from './algorithms/BreadthFirstSearch';
import DepthFirstSearch from './algorithms/DepthFirstSearch';
import { DIJKSTRA, A_STAR, BFS, DFS } from './constants';

const PathfinderMapping = {
  [DIJKSTRA]: Dijkstra,
  [A_STAR]: AStar,
  [BFS]: BreadthFirstSearch,
  [DFS]: DepthFirstSearch,
};

export { PathfinderMapping };
