import React, { Component } from 'react';
import Node from '../Node/Node';
import { Context } from '../../ContextProvider';

import './Board.css';
import { MODES } from '../../constants';

export default class Board extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      mode: MODES.ADD,
    };
  }

  handleMouseDown = (e) => {
    let { start, finish } = this.context;
    const rowIdx = Number(e.target.dataset.rowIdx);
    const colIdx = Number(e.target.dataset.colIdx);
  };
  // handleTouchStart

  handleMouseUp = (e) => {
    console.log('this is:', this);
  };
  // handleTouchEnd

  handleMouseMove = (e) => {};
  // handleTouchMove

  handleMouseOut = (e) => {};
  // handleTouchEnd

  render() {
    let { board } = this.context;

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
