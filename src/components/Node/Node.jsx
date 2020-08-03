import React, { Component } from 'react';

import './Node.css';

export default class Node extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { rowIdx, colIdx } = this.props;
    // const extraClassName = rowIdx === 2 && colIdx === 2 ? ' node-start' : '';
    const extraClassName = '';
    return (
      <div
        className={`node${extraClassName}`}
        data-rowIdx={rowIdx}
        data-colIdx={colIdx}
      >
        <div className="path" />
      </div>
    );
  }
}
