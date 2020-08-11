import React from 'react';
import Node from '../Node/Node';

import './Board.css';
import {
  IDLE,
  DRAGGING_START,
  DRAGGING_FINISH,
  DRAWING,
  ERASING,
  NODE_WALL,
  NODE_INITIAL,
} from '../../constants';

export default class Board extends React.PureComponent {
  constructor(props) {
    super(props);
    this.mode = IDLE;
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
    const { start, finish, updateNodeType } = this.props;
    // if (isVisualizing.current) {
    //   return;
    // }

    const isParentNode = e.target.parentElement.classList.contains(
      'board__node'
    );
    if (!isParentNode && !e.target.classList.contains('board__node')) {
      return;
    }
    const targetElement = isParentNode ? e.target.parentElement : e.target;

    const rowIdx = Number(targetElement.dataset.rowIdx);
    const colIdx = Number(targetElement.dataset.colIdx);
    if (this.isStartPos(colIdx, rowIdx, start)) {
      this.mode = DRAGGING_START;
    } else if (this.isFinishPos(colIdx, rowIdx, finish)) {
      this.mode = DRAGGING_FINISH;
    } else {
      // targetElement.className === 'board__node'
      if (targetElement.dataset.type === NODE_INITIAL) {
        this.mode = DRAWING;
        updateNodeType(rowIdx, colIdx, NODE_WALL);
      } else {
        this.mode = ERASING;
        updateNodeType(rowIdx, colIdx, NODE_INITIAL);
      }
    }
    // this.prevPos.y = rowIdx;
    // this.prevPos.x = colIdx;
  };
  handleTouchStart = this.handleMouseDown;

  handleMouseUp = (e) => {
    e.preventDefault();
    this.mode = IDLE;
  };
  handleTouchEnd = this.handleMouseUp;

  // Could throttle this function to optimize performance
  handleMouseMove = (e) => {
    e.preventDefault();
    let { start, finish } = this.props;
    const { updateNodeType } = this.props;
    // if (isVisualizing.current) {
    //   return;
    // }
    // if (this.mode === IDLE) return;

    // e.target.parentElement.className.indexOf('board__node') !== -1
    const isParentNode = e.target.parentElement.classList.contains(
      'board__node'
    );
    if (!isParentNode && !e.target.classList.contains('board__node')) {
      return;
    }
    const targetElement = isParentNode ? e.target.parentElement : e.target;

    const rowIdx = Number(targetElement.dataset.rowIdx);
    const colIdx = Number(targetElement.dataset.colIdx);
    // if (this.prevPos.y === rowIdx && this.prevPos.x === colIdx) {
    //   return;
    // }

    switch (this.mode) {
      case DRAGGING_START:
        if (this.isStartOrFinishPos(colIdx, rowIdx, start, finish)) {
          return;
        }
        this.dragNode(rowIdx, colIdx, start);
        this.dragVisualize();
        break;
      case DRAGGING_FINISH:
        if (this.isStartOrFinishPos(colIdx, rowIdx, start, finish)) {
          return;
        }
        this.dragNode(rowIdx, colIdx, finish);
        this.dragVisualize();
        break;
      case DRAWING:
        updateNodeType(rowIdx, colIdx, NODE_WALL);
        break;
      case ERASING:
        updateNodeType(rowIdx, colIdx, NODE_INITIAL);
        break;
    }
    // this.prevPos.y = rowIdx;
    // this.prevPos.x = colIdx;
  };
  handleTouchMove = this.handleMouseMove;

  dragNode = (rowIdx, colIdx, nodePos) => {
    const { updateNodeCache } = this.props;
    const prevX = nodePos.x; // this.prevPos.x
    const prevY = nodePos.y; // this.prevPos.y
    nodePos.y = rowIdx;
    nodePos.x = colIdx;
    updateNodeCache.get(`${prevY}-${prevX}`).forceNodeUpdate();
    updateNodeCache.get(`${rowIdx}-${colIdx}`).forceNodeUpdate();
  };

  dragVisualize = () => {
    const {
      isPathVisualized,
      clearBoard,
      initPathfinder,
      pathfinder,
    } = this.props;
    if (isPathVisualized.current) {
      clearBoard(false, false);
      initPathfinder(false);
      pathfinder.current.run();
    }
  };

  render() {
    console.log('board rendered');
    // Could pass in board lengths instead for optimizing performance
    const { board, start, finish, updateNodeCache } = this.props;
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
            <div key={rowIdx} id={`row-${rowIdx}`} className="board__row">
              {row.map((col, colIdx) => {
                return (
                  <Node
                    key={`${rowIdx}-${colIdx}`}
                    rowIdx={rowIdx}
                    colIdx={colIdx}
                    start={start}
                    finish={finish}
                    updateNodeCache={updateNodeCache}
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
