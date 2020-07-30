import React, { Component } from 'react';

import './Node.css';

export default class Node extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { isFinish, isStart } = this.props;
    const extraClassName = isFinish
      ? 'node-finish'
      : isStart
      ? 'node-start'
      : '';
    return <td className={`node ${extraClassName}`}></td>;
  }
}
