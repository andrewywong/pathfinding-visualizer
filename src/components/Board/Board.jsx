import React from 'react';
import Node from '../Node/Node';
import './Board.css';
import {
  IDLE,
  DRAGGING_START,
  DRAGGING_FINISH,
  DRAWING,
  ERASING,
  NODE_INITIAL,
} from '../../constants';

export default class Board extends React.PureComponent {
  constructor(props) {
    super(props);
    this.mode = IDLE;
    this.prevPos = { x: -1, y: -1 };
  }

  componentDidMount() {
    window.addEventListener('mouseup', this.handlePointerUp);
    window.addEventListener('touchend', this.handlePointerUp);
    window.addEventListener('touchcancel', this.handlePointerUp);
  }

  componentWillUnmount() {
    window.removeEventListener('mouseup', this.handlePointerUp);
    window.removeEventListener('touchend', this.handlePointerUp);
    window.removeEventListener('touchcancel', this.handlePointerUp);
  }

  // Helper methods
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

  // Event handlers
  handlePointerDown = (e) => {
    // e.preventDefault();
    const { start, finish, updateNodeType, drawType } = this.props;

    // e.target.className.indexOf('board__node') !== -1
    if (!e.target.classList.contains('board__node')) {
      return;
    }

    const rowIdx = Number(e.target.dataset.rowIdx);
    const colIdx = Number(e.target.dataset.colIdx);
    if (this.isStartPos(colIdx, rowIdx, start)) {
      this.mode = DRAGGING_START;
    } else if (this.isFinishPos(colIdx, rowIdx, finish)) {
      this.mode = DRAGGING_FINISH;
    } else {
      // e.target.dataset.type === NODE_INITIAL
      if (e.target.className === 'board__node') {
        this.mode = DRAWING;
        updateNodeType(rowIdx, colIdx, drawType.current); // NODE_WALL
      } else {
        this.mode = ERASING;
        updateNodeType(rowIdx, colIdx, NODE_INITIAL);
      }
    }
    // this.prevPos.y = rowIdx;
    // this.prevPos.x = colIdx;
  };

  handlePointerUp = (e) => {
    this.mode = IDLE;
  };

  // Could throttle this function to optimize performance
  handlePointerMove = (e) => {
    let { start, finish } = this.props;
    const { updateNodeType, drawType } = this.props;

    const realTarget =
      e.type !== 'touchmove'
        ? e.target
        : document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY);

    // e.target.className.indexOf('board__node') !== -1
    if (!realTarget.classList.contains('board__node')) {
      return;
    }

    const rowIdx = Number(realTarget.dataset.rowIdx);
    const colIdx = Number(realTarget.dataset.colIdx);
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
        updateNodeType(rowIdx, colIdx, drawType.current); // NODE_WALL
        break;
      case ERASING:
        updateNodeType(rowIdx, colIdx, NODE_INITIAL);
        break;
    }
    // this.prevPos.y = rowIdx;
    // this.prevPos.x = colIdx;
  };

  // Helper methods
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
    // console.log('board rendered');
    // Could pass in board lengths instead to optimize performance
    const { board, start, finish, updateNodeCache } = this.props;
    return (
      <div
        id="board"
        onMouseDown={this.handlePointerDown}
        onMouseMove={this.handlePointerMove}
        onTouchStart={this.handlePointerDown}
        onTouchMove={this.handlePointerMove}
        onTouchEnd={(e) => e.preventDefault()}
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
