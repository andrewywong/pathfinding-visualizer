import React, { Component } from 'react';
import Node from '../Node/Node';

import './Board.css';

export default class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
    };
  }

  componentDidMount() {
    const nodes = [];
    // Change rows and cols depending on the device width
    const maxCols = window.innerWidth / 28;
    const maxRows = Math.round(maxCols / 3);
    console.log(maxRows);

    for (let row = 0; row < maxRows; ++row) {
      const currentRow = [];
      for (let col = 0; col < maxCols; ++col) {
        const currentNode = {
          col,
          row,
          isStart:
            row === Math.trunc(maxRows / 2) &&
            col === Math.trunc(maxCols * (1 / 4)),
          isFinish:
            row === Math.trunc(maxRows / 2) &&
            col === Math.trunc(maxCols * (3 / 4)),
        };
        currentRow.push(currentNode);
      }
      nodes.push(currentRow);
    }
    this.setState({ nodes });

    // TODO: Add event listener for 'resize' to resize board
    // https://stackoverflow.com/questions/19014250/rerender-view-on-browser-resize-with-react
  }

  render() {
    const { nodes } = this.state;

    return (
      <table className="board">
        {nodes.map((row, rowIdx) => {
          return (
            <tr key={rowIdx}>
              {row.map((node, nodeIdx) => {
                const { isStart, isFinish } = node;
                return (
                  <Node key={nodeIdx} isStart={isStart} isFinish={isFinish} />
                );
              })}
            </tr>
          );
        })}
      </table>
    );
  }
}
