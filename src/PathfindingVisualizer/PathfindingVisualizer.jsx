import React, { Component } from 'react';
import Node from './Node/Node';

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
    let maxRows = maxCols / 2;

    for (let row = 0; row < maxRows; ++row) {
      const currentRow = [];
      for (let col = 0; col < maxCols; ++col) {
        currentRow.push([]);
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
              <tr>
                {row.map((node, nodeIdx) => (
                  <Node></Node>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}
