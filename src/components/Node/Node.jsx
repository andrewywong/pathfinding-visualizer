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
    this.state = {
      type: NODE_INITIAL,
      isVisited: false,
      isShortest: false,
    };

    // const { rowIdx, colIdx } = this.props;
    // let { updateNodeCache } = this.context;
    // updateNodeCache.set(`${rowIdx}-${colIdx}`, {
    //   setType: this.setType,
    //   setIsVisited: this.setIsVisited,
    //   setIsShortest: this.setIsShortest,
    //   forceNodeUpdate: this.forceNodeUpdate,
    // });
  }

  componentDidMount() {
    const { rowIdx, colIdx } = this.props;
    let { updateNodeCache } = this.context;
    updateNodeCache.set(`${rowIdx}-${colIdx}`, {
      setType: this.setType,
      setIsVisited: this.setIsVisited,
      setIsShortest: this.setIsShortest,
      forceNodeUpdate: this.forceNodeUpdate,
    });
  }

  setType = (value) => {
    this.setState({ type: value });
  };

  setIsVisited = (value) => {
    this.setState({ isVisited: value });
  };

  setIsShortest = (value) => {
    this.setState({ isShortest: value });
  };

  forceNodeUpdate = (value) => {
    this.forceUpdate();
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
    if (this.state.isVisited) {
      extraClassNames += ' ';
      extraClassNames += NODE_VISITED;
    }
    if (this.state.isShortest) {
      extraClassNames += ' ';
      extraClassNames += NODE_SHORTEST;
    }
    return extraClassNames;
  }

  render() {
    console.log('node rendered');
    const { rowIdx, colIdx } = this.props;
    return (
      <div
        id={`node-${rowIdx}-${colIdx}`}
        className={`node${this.getNodeClassNames()}`}
        data-row-idx={rowIdx}
        data-col-idx={colIdx}
        data-type={this.state.type}
      >
        <div className={`path${this.getPathClassNames()}`} />
      </div>
    );
  }
}
