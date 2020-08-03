import React, { Component } from 'react';
import Node from '../Node/Node';
import { Context } from '../../ContextProvider';

import './Board.css';

export default class Board extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      isDragging: false,
      // toggle between erasing/adding walls
    };
  }

  render() {
    let { board, start, finish, isVisualizing } = this.context;

    return (
      <div className="board">
        {board.map((row, rowIdx) => {
          return (
            <div key={rowIdx} className="row">
              {row.map((col, colIdx) => {
                return (
                  <Node
                    key={`${rowIdx}-${colIdx}`}
                    rowIdx={rowIdx}
                    colIdx={colIdx}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}
