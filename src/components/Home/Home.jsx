import React, { Component } from 'react';
import Board from '../Board/Board';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <Board />;
  }
}
