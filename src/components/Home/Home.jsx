import React, { Component } from 'react';
import Board from '../Board/Board';
import { Context } from '../../ContextProvider';

export default class Home extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <Board />;
  }
}
