import React, { Component } from 'react';
import './Home.css';
import Board from '../Board/Board';
import Header from '../Header/Header';
import NavBar from '../NavBar/NavBar';
import { NODE_INITIAL, NODE_WALL, DIJKSTRA, DELAY_FAST } from '../../constants';
import Timer from '../../algorithms/Timer';
import { PathfinderMapping } from '../../algorithms/factory';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.board = [];
    this.updateNodeCache = new Map();
    this.pathfinder = {};

    this.isPathVisualized = { current: false };
    this.drawType = { current: NODE_WALL };
    this.state = {
      isVisualizing: false,
      helpShow: false,
      delayInterval: DELAY_FAST,
      algorithmType: DIJKSTRA,
      pause: false,
      drawType: NODE_WALL,
    };
    this.setupBoard();
  }

  // componentDidMount() {
  //   // this.setupBoard();
  //   // TODO: HANDLE ISSUE OF BOARD NOT RERENDERING
  //   // https://stackoverflow.com/questions/19014250/rerender-view-on-browser-resize-with-react
  //   // Should throttle this event to optimize performance
  //   window.addEventListener('resize', this.setupBoard);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('resize', this.setupBoard);
  // }

  setupBoard = () => {
    const nodes = [];
    // Change rows and cols depending on the device width
    const maxCol = window.innerWidth / 25;
    const maxRow = window.innerHeight / 40;
    // Note: maxRow and maxCol can be floats

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
      if (this.start.y > maxRow) {
        this.start.y = Math.trunc(maxRow);
      }
      if (this.start.x > maxCol) {
        this.start.x = Math.trunc(maxCol);
      }

      if (this.finish.y > maxRow) {
        this.finish.y = Math.trunc(maxRow);
      }
      if (this.finish.x > maxCol) {
        this.finish.x = Math.trunc(maxCol);
      }
      // TODO: Handle issue of overlapping start and finish values
    }

    // Initialize board
    for (let rowIdx = 0; rowIdx < maxRow; ++rowIdx) {
      nodes[rowIdx] = [];
      for (let colIdx = 0; colIdx < maxCol; ++colIdx) {
        nodes[rowIdx][colIdx] = {
          type: NODE_INITIAL,
        };
        // nodes[rowIdx][colIdx] = NODE_INITIAL;
      }
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

          // nodes[rowIdx][colIdx] = Object.assign({}, this.board[rowIdx][colIdx]);
          nodes[rowIdx][colIdx] = { type: this.board[rowIdx][colIdx].type };
        }
      }

      this.updateNodeCache
        .get(`${this.finish.y}-${this.finish.x}`)
        .forceNodeUpdate();
      this.forceUpdate();
    }

    this.board = nodes;
    console.log('Set up board.');
  };

  // public class fields syntax
  setIsVisualizing = (value) => {
    this.setState({ isVisualizing: value });
  };

  setIsPathVisualized = (value) => {
    this.isPathVisualized.current = value;
  };

  setAlgorithmType = (value) => {
    this.setState({ algorithmType: value });
  };

  setDelayInterval = (value) => {
    this.setState({ delayInterval: Number(value) });
  };

  setPause = (value) => {
    this.setState({ pause: value });
  };

  setDrawType = (value) => {
    this.drawType.current = value;
    this.setState({ drawType: value });
  };

  setHelpShow = (value) => {
    this.setState({ helpShow: value });
  };

  updateNode = (value, updateNodeState, timeCounter) => {
    if (timeCounter) {
      const timer = new Timer(
        () => {
          updateNodeState(value);
          this.pathfinder.current.timers.shift();
        }, // callback
        timeCounter * this.state.delayInterval // delay
      );
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
    timeCounter = 0,
    isAnimated = true
  ) => {
    const setIsVisited = this.updateNodeCache.get(`${rowIdx}-${colIdx}`)
      .setIsVisited;
    this.updateNode({ isVisited, isAnimated }, setIsVisited, timeCounter);
  };

  updateNodeIsShortest = (
    rowIdx,
    colIdx,
    isShortest = false,
    timeCounter = 0,
    isAnimated = true
  ) => {
    const setIsShortest = this.updateNodeCache.get(`${rowIdx}-${colIdx}`)
      .setIsShortest;
    this.updateNode({ isShortest, isAnimated }, setIsShortest, timeCounter);
  };

  clearBoard = (clearWalls = true, delayedIteration = true) => {
    if (this.pathfinder.current) {
      this.pathfinder.current.clearTimers();
    }

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
    if (delayedIteration) {
      this.setIsPathVisualized(false);
    }
    this.setIsVisualizing(false);
    this.setState({ pause: false });
  };

  initPathfinder = (delayedIteration = true) => {
    this.pathfinder.current = new PathfinderMapping[this.state.algorithmType](
      this.board,
      this.start,
      this.finish,
      this.updateNodeIsVisited,
      this.updateNodeIsShortest,
      delayedIteration
    );
  };

  render() {
    return (
      <div className="Home">
        <NavBar />
        <Header
          isVisualizing={this.state.isVisualizing}
          delayInterval={this.state.delayInterval}
          algorithmType={this.state.algorithmType}
          pause={this.state.pause}
          drawType={this.state.drawType}
          pathfinder={this.pathfinder}
          setIsVisualizing={this.setIsVisualizing}
          setIsPathVisualized={this.setIsPathVisualized}
          setDelayInterval={this.setDelayInterval}
          setAlgorithmType={this.setAlgorithmType}
          setPause={this.setPause}
          setDrawType={this.setDrawType}
          clearBoard={this.clearBoard}
          initPathfinder={this.initPathfinder}
        />
        <Board
          board={this.board}
          isPathVisualized={this.isPathVisualized}
          drawType={this.drawType}
          updateNodeType={this.updateNodeType}
          start={this.start}
          finish={this.finish}
          updateNodeCache={this.updateNodeCache}
          pathfinder={this.pathfinder}
          clearBoard={this.clearBoard}
          initPathfinder={this.initPathfinder}
        />
      </div>
    );
  }
}
