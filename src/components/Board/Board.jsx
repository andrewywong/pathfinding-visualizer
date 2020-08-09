import React from 'react';
import Node from '../Node/Node';
import { Context } from '../../ContextProvider';

import './Board.css';
import { EDITING_MODES, NODE_WALL, NODE_INITIAL } from '../../constants';

export default class Board extends React.PureComponent {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.mode = EDITING_MODES.IDLE;
    // this.state = {
    //   mode: EDITING_MODES.IDLE,
    // };
    this.prevPos = { x: -1, y: -1 };
  }

  componentDidMount() {
    window.addEventListener('mouseup', this.handleMouseUp);
    window.addEventListener('touchend', this.handleTouchEnd);
  }

  componentWillUnmount() {
    window.removeEventListener('mouseup', this.handleMouseUp);
    window.removeEventListener('touchend', this.handleTouchEnd);
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
    e.preventDefault();
    const { start, finish, isVisualizing, updateNodeType } = this.context;
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
      this.mode = EDITING_MODES.DRAGGING_START;
    } else if (this.isFinishPos(colIdx, rowIdx, finish)) {
      this.mode = EDITING_MODES.DRAGGING_FINISH;
    } else {
      // targetElement.className === 'node'
      if (targetElement.dataset.type === NODE_INITIAL) {
        this.mode = EDITING_MODES.DRAWING;
        updateNodeType(rowIdx, colIdx, NODE_WALL);
      } else {
        this.mode = EDITING_MODES.ERASING;
        updateNodeType(rowIdx, colIdx, NODE_INITIAL);
      }
    }
    // this.prevPos.y = rowIdx;
    // this.prevPos.x = colIdx;
  };
  handleTouchStart = this.handleMouseDown;

  handleMouseUp = (e) => {
    e.preventDefault();
    this.mode = EDITING_MODES.IDLE;
  };
  handleTouchEnd = this.handleMouseUp;

  // Could throttle this function to optimize performance
  handleMouseMove = (e) => {
    e.preventDefault();
    let { start, finish } = this.context;
    const { isVisualizing, updateNodeType } = this.context;
    if (isVisualizing) {
      return;
    }
    // if (this.mode === EDITING_MODES.IDLE) return;

    // e.target.parentElement.className.indexOf('node') !== -1
    const isParentNode = e.target.parentElement.classList.contains('node');
    if (!isParentNode && !e.target.classList.contains('node')) {
      return;
    }
    const targetElement = isParentNode ? e.target.parentElement : e.target;

    const rowIdx = Number(targetElement.dataset.rowIdx);
    const colIdx = Number(targetElement.dataset.colIdx);
    // if (this.prevPos.y === rowIdx && this.prevPos.x === colIdx) {
    //   return;
    // }

    switch (this.mode) {
      case EDITING_MODES.DRAGGING_START:
        if (this.isStartOrFinishPos(colIdx, rowIdx, start, finish)) {
          return;
        }
        this.dragNode(rowIdx, colIdx, start);
        //if isPathVisualized
        break;
      case EDITING_MODES.DRAGGING_FINISH:
        if (this.isStartOrFinishPos(colIdx, rowIdx, start, finish)) {
          return;
        }
        this.dragNode(rowIdx, colIdx, finish);
        break;
      case EDITING_MODES.DRAWING:
        updateNodeType(rowIdx, colIdx, NODE_WALL);
        break;
      case EDITING_MODES.ERASING:
        updateNodeType(rowIdx, colIdx, NODE_INITIAL);
        break;
    }
    // this.prevPos.y = rowIdx;
    // this.prevPos.x = colIdx;
  };
  handleTouchMove = this.handleMouseMove;

  dragNode = (rowIdx, colIdx, nodePos) => {
    const { updateNodeCache } = this.context;
    let { test } = this.props;
    console.log('Before Board: ' + test.x + ' ' + test.y);
    const prevX = nodePos.x; // this.prevPos.x
    const prevY = nodePos.y; // this.prevPos.y
    nodePos.y = rowIdx;
    nodePos.x = colIdx;
    updateNodeCache.get(`${prevY}-${prevX}`).forceNodeUpdate();
    updateNodeCache.get(`${rowIdx}-${colIdx}`).forceNodeUpdate();
  };

  render() {
    console.log('board rendered');
    // Could pass in board lengths instead for optimizing performance
    const { board } = this.context;
    return (
      <div
        id="board"
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        // TODO: Handle issue of touch controls not working properly
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
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
