import React, { Component } from 'react';
import Board from '../Board/Board';
import Header from '../Header/Header';
import { Context } from '../../ContextProvider';

export default class Home extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <Board />
      </React.Fragment>
    );
  }
}
