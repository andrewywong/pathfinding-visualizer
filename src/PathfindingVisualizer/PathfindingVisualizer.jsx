import React, { Component } from 'react';
import Node from './components/Node';

import './PathfindingVisualizer.css';

export default class PathfindingVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: []
    };
  }

  componentDidMount() {
    const nodes = [];
    // Change rows and cols depending on the device width
    let maxCols = window.innerWidth / 25;
    maxCols = Math.round(maxCols * 0.8);
    let maxRows = Math.round(maxCols / 2);
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
            col === Math.trunc(maxCols * (3 / 4))
        };
        currentRow.push(currentNode);
      }
      nodes.push(currentRow);
    }
    this.setState({ nodes });
  }

  render() {
    const { nodes } = this.state;

    return (
      <table className="board">
        <tbody>
          {nodes.map((row, rowIdx) => {
            return (
              <tr key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const { isStart, isFinish } = node;
                  return (
                    <Node
                      key={nodeIdx}
                      isStart={isStart}
                      isFinish={isFinish}
                    ></Node>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}
