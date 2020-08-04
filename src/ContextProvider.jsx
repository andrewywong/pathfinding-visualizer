import React, { Component } from 'react';
import { DELAY_NORMAL, NODE_INITIAL } from './constants';

const Context = React.createContext();

class ContextProvider extends Component {
  constructor(props) {
    super(props);
    this.delay = DELAY_NORMAL;
    this.updateNodeCache = new Map();
    this.state = {
      isPathExisting: true,
      isVisualizing: false,
      isHelpOn: false,
    };
    this.setupBoard();
  }

  componentDidMount() {
    this.setupBoard();

    // TODO: Add event listener for 'resize' to resize board
    // https://stackoverflow.com/questions/19014250/rerender-view-on-browser-resize-with-react
    // window.addEventListener('resize', this.setupBoard);
  }

  // componentWillUnmount() {
  //   window.removeEventListener('resize', this.setupBoard);
  // }

  setupBoard() {
    const nodes = [];
    // Change rows and cols depending on the device width
    const maxCol = window.innerWidth / 26;
    const maxRow = Math.round(maxCol / 3);

    // Deep Copy Methods
    // https://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-deep-clone-an-object-in-javascript
    // JSON.parse(JSON.stringify(this.start));
    // Object.assign({}, this.start);

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
      for (let rowIdx = 0; rowIdx < this.board.length; ++rowIdx) {
        for (let colIdx = 0; colIdx < this.board[rowIdx].length; ++colIdx) {
          // TODO: PROBABLY NEED TO DEEP COPY INSTEAD
          nodes[rowIdx][colIdx] = Object.assign({}, this.board[rowIdx][colIdx]);
          // nodes[rowIdx][colIdx] = this.board[rowIdx][colIdx];
        }
      }
    }

    this.board = nodes;
    console.log('Set up board.');
  }

  // public class fields syntax
  setIsPathExisting = (value) => {
    this.setState({ isPathExisting: value });
  };

  setIsVisualizing = (value) => {
    this.setState({ isVisualizing: value });
  };

  setIsHelpOn = (value) => {
    this.setState({ isHelpOn: value });
  };

  updateNode = (rowIdx, colIdx, nodeType = NODE_INITIAL) => {
    this.board[rowIdx][colIdx].type = nodeType;
  };

  render() {
    return (
      <Context.Provider
        value={{
          // State
          isPathExisting: this.state.isPathExisting,
          isVisualizing: this.state.isVisualizing,
          isHelpOn: this.state.isHelpOn,

          // Functions
          setIsPathExisting: this.setIsPathExisting,
          setIsVisualizing: this.setIsVisualizing,
          setIsHelpOn: this.setIsHelpOn,

          // Variables
          board: this.board,
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
