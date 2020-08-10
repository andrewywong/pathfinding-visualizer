import React, { Component } from 'react';
import Board from '../Board/Board';
import Header from '../Header/Header';
import { DELAY_NORMAL, NODE_INITIAL, DIJKSTRA } from '../../constants';
import Timer from '../../algorithms/Timer';
import PathfinderMapping from '../../algorithms/factory';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.board = [];
    this.updateNodeCache = new Map();
    this.pathfinder = { current: {} };

    this.isVisualizing = { current: false };
    this.isPathVisualized = { current: false };
    this.state = {
      isVisualizing: false,
      isHelpShown: false,
      delayInterval: DELAY_NORMAL,
      algorithmType: DIJKSTRA,
    };
    this.setupBoard();
  }

  // componentDidMount() {
  //   // this.setupBoard();
  //   // TODO: HANDLE ISSUE OF BOARD NOT RERENDERING
  //   // https://stackoverflow.com/questions/19014250/rerender-view-on-browser-resize-with-react
  //   // Should throttle this event to optimize performance
  //   // window.addEventListener('resize', this.setupBoard);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('resize', this.setupBoard);
  // }

  setupBoard = () => {
    const nodes = [];
    // Change rows and cols depending on the device width
    const maxCol = window.innerWidth / 26;
    const maxRow = window.innerHeight / 40;

    if (!this.start || !this.finish) {
      // Assign new start and finish values
      this.start = {
        x: Math.trunc(maxCol * (1 / 4)),
        y: Math.trunc(maxRow / 2),
      };
      this.finish = {
        x: Math.trunc(maxCol * (3 / 4)),
        y: Math.trunc(maxRow / 2),
      };
    } else {
      // Use preexisting start and finish values
      if (this.start.y >= maxRow) {
        this.start.y = maxRow - 1;
      }
      if (this.start.x >= maxCol) {
        this.start.x = maxCol - 1;
      }

      if (this.finish.y >= maxRow) {
        this.finish.y = maxRow - 1;
      }
      if (this.finish.x >= maxCol) {
        this.finish.x = maxCol - 1;
      }
      // TODO: Handle issue of overlapping start and finish values
    }

    // Initialize board
    for (let rowIdx = 0; rowIdx < maxRow; ++rowIdx) {
      const currentRow = [];
      for (let colIdx = 0; colIdx < maxCol; ++colIdx) {
        const currentNode = {
          type: NODE_INITIAL,
          visited: false,
        };
        currentRow.push(currentNode);
      }
      nodes.push(currentRow);
    }

    // Copy over preexisting board
    if (this.board && this.board.length) {
      // board and board.length are truthy
      const shorterRow = this.board.length < nodes.length ? this.board : nodes;
      const shorterCol =
        this.board[0].length < nodes[0].length ? this.board : nodes;
      for (let rowIdx = 0; rowIdx < shorterRow.length; ++rowIdx) {
        for (let colIdx = 0; colIdx < shorterCol[rowIdx].length; ++colIdx) {
          // Deep Copy Methods
          // JSON.parse(JSON.stringify(this.start));
          // Object.assign({}, this.start);
          nodes[rowIdx][colIdx] = Object.assign({}, this.board[rowIdx][colIdx]);
          // nodes[rowIdx][colIdx] = this.board[rowIdx][colIdx];
        }
      }
    }

    this.board = nodes;
    console.log('Set up board.');

    // this.forceUpdate();
  };

  // public class fields syntax
  setIsVisualizing = (value) => {
    this.isVisualizing.current = value;
    this.setState({ isVisualizing: value });
  };

  updateNode = (value, updateNodeState, timeCounter) => {
    if (timeCounter) {
      const timer = new Timer({
        callback: () => updateNodeState(value),
        delay: timeCounter * this.state.delayInterval,
      });
      this.pathfinder.current.timers.push(timer);
    } else {
      updateNodeState(value);
    }
  };

  updateNodeType = (
    rowIdx,
    colIdx,
    nodeType = NODE_INITIAL,
    timeCounter = 0
  ) => {
    this.board[rowIdx][colIdx].type = nodeType;
    const setType = this.updateNodeCache.get(`${rowIdx}-${colIdx}`).setType;
    this.updateNode(nodeType, setType, timeCounter);
  };

  updateNodeIsVisited = (
    rowIdx,
    colIdx,
    isVisited = false,
    timeCounter = 0
  ) => {
    this.board[rowIdx][colIdx].visited = isVisited;
    const setIsVisited = this.updateNodeCache.get(`${rowIdx}-${colIdx}`)
      .setIsVisited;
    this.updateNode(isVisited, setIsVisited, timeCounter);
  };

  updateNodeIsShortest = (
    rowIdx,
    colIdx,
    isShortest = false,
    timeCounter = 0
  ) => {
    const setIsShortest = this.updateNodeCache.get(`${rowIdx}-${colIdx}`)
      .setIsShortest;
    this.updateNode(isShortest, setIsShortest, timeCounter);
  };

  clearBoard = (clearWalls = true) => {
    this.board.forEach((row, rowIdx) => {
      row.forEach((col, colIdx) => {
        if (clearWalls) {
          this.updateNodeType(rowIdx, colIdx, NODE_INITIAL);
        }
        //clearing path
        this.updateNodeIsVisited(rowIdx, colIdx, false);
        this.updateNodeIsShortest(rowIdx, colIdx, false);
      });
    });
    //setIsPathVisualized(false);
    //setIsVisualizing(false);
  };

  initPathfinder = (delayIteration = true) => {
    this.pathfinder.current = new PathfinderMapping[this.state.algorithmType](
      this.start,
      this.finish,
      this.board,
      this.updateNodeIsVisited,
      this.updateNodeIsShortest,
      delayIteration
    );
  };

  render() {
    return (
      <React.Fragment>
        <Header
          isVisualizing={this.state.isVisualizing}
          delayInterval={this.state.delayInterval}
          algorithmType={this.state.algorithmType}
          pathfinder={this.pathfinder}
          setIsVisualizing={this.setIsVisualizing}
          clearBoard={this.clearBoard}
          initPathfinder={this.initPathfinder}
        />
        <Board
          board={this.board}
          isVisualizing={this.isVisualizing}
          isPathVisualized={this.isPathVisualized}
          updateNodeType={this.updateNodeType}
          start={this.start}
          finish={this.finish}
          updateNodeCache={this.updateNodeCache}
        />
      </React.Fragment>
    );
  }
}
