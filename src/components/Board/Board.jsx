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
      isDragging: { start: false, finish: false },
      isEditing: false,
    };
  }

  handleMouseDown = (e) => {
    const { start, finish, isVisualizing } = this.context;
    if (isVisualizing) {
      return;
    }

    const isParentNode = e.target.parentElement.classList.contains('node');
    if (!isParentNode && !e.target.classList.contains('node')) {
      return;
    }
    const targetElement = isParentNode ? e.target.parentElement : e.target;
    targetElement.classList.forEach((element) => {
      console.log(element);
    });

    const rowIdx = Number(targetElement.dataset.rowIdx);
    const colIdx = Number(targetElement.dataset.colIdx);
    if (rowIdx === start.y && colIdx === start.x) {
      this.setState({ isDragging: { start: true, finish: false } });
    } else if (rowIdx === finish.y && colIdx === finish.x) {
      this.setState({ isDragging: { start: false, finish: true } });
    } else {
      if (targetElement.className === 'node') {
        this.setState({ mode: MODES.add });
      } else {
        this.setState({ mode: MODES.erase });
      }
    }
  };
  // handleTouchStart

  handleMouseUp = (e) => {
    this.setState({
      isDragging: { start: false, finish: false },
      isEditing: false,
    });
  };
  // handleTouchEnd

  handleMouseMove = (e) => {
    let { start, finish, isVisualizing } = this.context;
    // e.target.parentElement.className.indexOf('node') !== -1
    if (isVisualizing) {
      return;
    }
    if (
      !this.state.isEditing ||
      !e.target.parentElement.classList.contains('node')
    ) {
      return;
    }
    const rowIdx = Number(e.target.parentElement.dataset.rowIdx);
    const colIdx = Number(e.target.parentElement.dataset.colIdx);
    if (this.state.mode === MODES.add) {
    } else {
    }
  };
  // handleTouchMove

  render() {
    let { board } = this.context;

    return (
      <div
        className="board"
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onMouseMove={this.handleMouseMove}
      >
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
