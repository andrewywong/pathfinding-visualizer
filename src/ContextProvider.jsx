import React, { Component } from 'react';
import { DELAY_NORMAL, NODE_INITIAL } from './constants';

const Context = React.createContext();

export default class ContextProvider extends Component {
  constructor(props) {
    super(props);
    this.delay = DELAY_NORMAL;
    this.state = { pathExists: true, visualizing: false, helpToggle: false };
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
    const maxCol = window.innerWidth / 28;
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
      if (this.start.x >= maxRow) {
        this.start.x = maxRow - 1;
      }
      if (this.start.y >= maxCol) {
        this.start.y = maxCol - 1;
      }

      if (this.finish.x >= maxRow) {
        this.finish.x = maxRow - 1;
      }
      if (this.finish.y >= maxCol) {
        this.finish.y = maxCol - 1;
      }
      // TODO: Handle issue of overlapping start and finish values
    }

    // Initialize board
    for (let row = 0; row < maxRow; ++row) {
      const currentRow = [];
      for (let col = 0; col < maxCol; ++col) {
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
      for (let row = 0; row < this.board.length; ++row) {
        for (let col = 0; col < this.board[row].length; ++col) {
          // TODO: PROBABLY NEED TO DEEP COPY INSTEAD
          // nodes[row][col] = Object.assign({}, this.board[row][col]);
          nodes[row][col] = this.board[row][col];
        }
      }
    }

    this.board = nodes;
    console.log('Set up board.');
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}
