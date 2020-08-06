import React, { Component } from 'react';
import Node from '../Node/Node';
import { Context } from '../../ContextProvider';

import './Board.css';
import { EDITING_MODES } from '../../constants';

export default class Board extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      mode: EDITING_MODES.IDLE,
    };
    this.prevPos = { x: -1, y: -1 };
  }

  isStartPos(posX, posY, start) {
    return posX === start.x && posY === start.y;
  }

  isFinishPos(posX, posY, finish) {
    return posX === finish.x && posY === finish.y;
  }

  isStartOrFinishPos(posX, posY, start, finish) {
    return (
      this.isStartPos(posX, posY, start) || this.isFinishPos(posX, posY, finish)
    );
  }

  handleMouseDown = (e) => {
    // e.target.classList.forEach((element) => {
    //   console.log(element);
    // });
    const { start, finish, isVisualizing } = this.context;
    if (isVisualizing) {
      return;
    }

    const isParentNode = e.target.parentElement.classList.contains('node');
    if (!isParentNode && !e.target.classList.contains('node')) {
      return;
    }
    const targetElement = isParentNode ? e.target.parentElement : e.target;

    const rowIdx = Number(targetElement.dataset.rowIdx);
    const colIdx = Number(targetElement.dataset.colIdx);
    if (this.isStartPos(colIdx, rowIdx, start)) {
      this.setState({ mode: EDITING_MODES.DRAGGING_START });
    } else if (this.isFinishPos(colIdx, rowIdx, finish)) {
      this.setState({ mode: EDITING_MODES.DRAGGING_FINISH });
    } else {
      if (targetElement.className === 'node') {
        this.setState({ mode: EDITING_MODES.ADDING });
        //updateNodeType()
      } else {
        this.setState({ mode: EDITING_MODES.ERASING });
        //updateNodeType()
      }
    }
  };
  handleTouchStart = this.handleMouseDown;

  handleMouseUp = () => {
    this.setState({
      mode: EDITING_MODES.IDLE,
    });
  };

  // Could throttle this function to optimize performance
  handleMouseMove = (e) => {
    // e.target.classList.forEach((element) => {
    //   console.log(element);
    // });
    const { start, finish, isVisualizing } = this.context;
    // e.target.parentElement.className.indexOf('node') !== -1
    if (isVisualizing) {
      return;
    }
    // if (this.state.mode === MODES.IDLE) return;

    const isParentNode = e.target.parentElement.classList.contains('node');
    if (!isParentNode && !e.target.classList.contains('node')) {
      return;
    }
    const targetElement = isParentNode ? e.target.parentElement : e.target;

    const rowIdx = Number(targetElement.dataset.rowIdx);
    const colIdx = Number(targetElement.dataset.colIdx);
    if (this.isStartOrFinishPos(colIdx, rowIdx, start, finish)) {
      return;
    }
    // if (prevPos.y === rowIdx && prevPos.x === colIdx) return;

    switch (this.state.mode) {
      case DRAGGING_START:
        break;
      case DRAGGING_FINISH:
        break;
      case ADDING:
        break;
      case ERASING:
        break;
    }
  };
  handleTouchMove = this.handleMouseMove;

  render() {
    // Could pass in board lengths instead for optimizing performance
    const { board } = this.context;

    return (
      <div
        id="board"
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        // onTouchStart={this.handleTouchStart}
        // onTouchMove={this.handleTouchMove}
      >
        {board.map((row, rowIdx) => {
          return (
            <div key={rowIdx} id={`row-${rowIdx}`} className="row">
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
