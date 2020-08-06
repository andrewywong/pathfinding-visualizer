import React, { Component } from 'react';
import { DELAY_NORMAL, NODE_INITIAL } from './constants';

const Context = React.createContext();

class ContextProvider extends Component {
  constructor(props) {
    super(props);
    this.delay = DELAY_NORMAL;
    this.updateNodeCache = new Map();
    this.state = {
      isPathVisualized: false,
      isVisualizing: false,
      isHelpShown: false,
    };
    this.setupBoard();
  }

  // componentDidMount() {
  //   // this.setupBoard();
  //   // TODO: HANDLE ISSUE OF BOARD NOT RERENDERING
  //   // https://stackoverflow.com/questions/19014250/rerender-view-on-browser-resize-with-react
  //   // Could throttle this event to optimize performance
  //   window.addEventListener('resize', this.setupBoard);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('resize', this.setupBoard);
  // }

  setupBoard() {
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
          // TODO: PROBABLY NEED TO DEEP COPY INSTEAD
          nodes[rowIdx][colIdx] = Object.assign({}, this.board[rowIdx][colIdx]);
          // nodes[rowIdx][colIdx] = this.board[rowIdx][colIdx];
        }
      }
    }

    this.board = nodes;
    this.boardMaxRow = maxRow;
    this.boardMaxCol = maxCol;
    console.log('Set up board.');
    console.log('numRows:' + this.board.length);
  }

  // public class fields syntax
  setIsPathVisualized = (value) => {
    this.setState({ isPathVisualized: value });
  };

  setIsVisualizing = (value) => {
    this.setState({ isVisualizing: value });
  };

  setIsHelpShown = (value) => {
    this.setState({ isHelpShown: value });
  };

  updateNode = (value, callback, timeCounter) => {
    if (timeCounter) {
    } else {
      callback(value);
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

  render() {
    return (
      <Context.Provider
        value={{
          // State
          isPathVisualized: this.state.isPathVisualized,
          isVisualizing: this.state.isVisualizing,
          isHelpShown: this.state.isHelpShown,

          // Functions
          updateNodeType: this.updateNodeType,
          updateNodeIsVisited: this.updateNodeIsVisited,
          updateNodeIsShortest: this.updateNodeIsShortest,
          setIsPathVisualized: this.setIsPathVisualized,
          setIsVisualizing: this.setIsVisualizing,
          setIsHelpShown: this.setIsHelpShown,

          // Variables
          board: this.board,
          // boardMaxRow: this.boardMaxRow,
          // boardMaxCol: this.boardMaxCol,
          start: this.start,
          finish: this.finish,
          delay: this.delay,
          updateNodeCache: this.updateNodeCache,
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export { Context, ContextProvider };
