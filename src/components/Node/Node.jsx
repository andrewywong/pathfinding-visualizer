import React, { Component } from 'react';

import './Node.css';
import {
  NODE_INITIAL,
  NODE_SHORTEST,
  NODE_VISITED,
  NODE_START,
  NODE_FINISH,
} from '../../constants';
import { Context } from '../../ContextProvider';

export default class Node extends Component {
  static contextType = Context;
  constructor(props, context) {
    super(props, context);
    this.state = { type: NODE_INITIAL, visited: false, shortest: false };
    const { rowIdx, colIdx } = this.props;
    let { updateNodeCache } = this.context;
    updateNodeCache.set(`${rowIdx}-${colIdx}`, {
      setType: this.setType,
      setVisited: this.setVisited,
      setShortest: this.setShortest,
    });
  }

  setType = (value) => {
    this.setState({ type: value });
  };

  setVisited = (value) => {
    this.setState({ visited: value });
  };

  setShortest = (value) => {
    this.setState({ shortest: value });
  };

  getNodeClassNames() {
    const { rowIdx, colIdx } = this.props;
    const { start, finish } = this.context;
    if (rowIdx === start.y && colIdx === start.x) {
      return ' ' + NODE_START;
    }
    if (rowIdx === finish.y && colIdx === finish.x) {
      return ' ' + NODE_FINISH;
    }
    if (this.state.type === NODE_INITIAL) {
      return '';
    }
    return ' ' + this.state.type;
  }

  getPathClassNames() {
    let extraClassNames = '';
    if (this.state.visited) {
      extraClassNames += ' ';
      extraClassNames += NODE_VISITED;
    }
    if (this.state.shortest) {
      extraClassNames += ' ';
      extraClassNames += NODE_SHORTEST;
    }
    return extraClassNames;
  }

  render() {
    const { rowIdx, colIdx } = this.props;
    return (
      <div
        className={`node${this.getNodeClassNames()}`}
        data-rowIdx={rowIdx}
        data-colIdx={colIdx}
      >
        <div className={`path${this.getPathClassNames()}`} />
      </div>
    );
  }
}
