import React, { Component } from 'react';
import Board from '../Board/Board';
import Header from '../Header/Header';
import NavBar from '../NavBar/NavBar';
import HelpModal from '../HelpModal/HelpModal';
import { NODE_INITIAL, NODE_WALL, DIJKSTRA, DELAY_FAST } from '../../constants';
import Timer from '../../algorithms/Timer';
import PATHFINDER_MAPPING from '../../algorithms/factory';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.board = [];
    this.updateNodeCache = new Map();
    this.pathfinder = {};

    this.canDragToVisualize = { current: false };
    this.drawType = { current: NODE_WALL };
    this.state = {
      isVisualizing: false,
      helpOpen: false,
      delayInterval: DELAY_FAST,
      algorithmType: DIJKSTRA,
      pause: false,
      drawType: NODE_WALL,
    };

    this.setupBoard();
  }

  // public class fields syntax
  setupBoard = () => {
    const nodes = [];
    // Change rows and cols depending on the device width
    const maxCol = Math.trunc(window.innerWidth / 25);
    const maxRow = Math.trunc(window.innerHeight / 35);

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
      nodes[rowIdx] = [];
      for (let colIdx = 0; colIdx < maxCol; ++colIdx) {
        nodes[rowIdx][colIdx] = {
          type: NODE_INITIAL,
        };
      }
    }

    this.board = nodes;
  };

  // Set state methods
  setIsVisualizing = (value) => {
    this.setState({ isVisualizing: value });
  };

  setCanDragToVisualize = (value) => {
    this.canDragToVisualize.current = value;
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

  setHelpOpen = (value) => {
    this.setState({ helpOpen: value });
  };

  // Update node state methods
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

  // Helper methods
  clearBoard = (clearWalls = true) => {
    if (this.pathfinder.current) {
      this.pathfinder.current.clearTimers();
    }

    this.board.forEach((row, rowIdx) => {
      row.forEach((col, colIdx) => {
        // clear walls/weights
        if (clearWalls) {
          this.updateNodeType(rowIdx, colIdx, NODE_INITIAL);
        }
        // clear path
        this.updateNodeIsVisited(rowIdx, colIdx, false);
        this.updateNodeIsShortest(rowIdx, colIdx, false);
      });
    });

    this.setIsVisualizing(false);
    this.setState({ pause: false });
  };

  initPathfinder = (delayedIteration = true) => {
    this.pathfinder.current = new PATHFINDER_MAPPING[this.state.algorithmType](
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
      <React.Fragment>
        <NavBar handleHelpOpen={() => this.setHelpOpen(true)} />
        <HelpModal
          helpOpen={this.state.helpOpen}
          handleHelpClose={() => this.setHelpOpen(false)}
        />
        <Header
          isVisualizing={this.state.isVisualizing}
          delayInterval={this.state.delayInterval}
          algorithmType={this.state.algorithmType}
          pause={this.state.pause}
          drawType={this.state.drawType}
          pathfinder={this.pathfinder}
          setIsVisualizing={this.setIsVisualizing}
          setCanDragToVisualize={this.setCanDragToVisualize}
          setDelayInterval={this.setDelayInterval}
          setAlgorithmType={this.setAlgorithmType}
          setPause={this.setPause}
          setDrawType={this.setDrawType}
          clearBoard={this.clearBoard}
          initPathfinder={this.initPathfinder}
        />
        <Board
          board={this.board}
          canDragToVisualize={this.canDragToVisualize}
          drawType={this.drawType}
          updateNodeType={this.updateNodeType}
          start={this.start}
          finish={this.finish}
          updateNodeCache={this.updateNodeCache}
          pathfinder={this.pathfinder}
          clearBoard={this.clearBoard}
          initPathfinder={this.initPathfinder}
        />
      </React.Fragment>
    );
  }
}
