import React, { Component } from 'react';
import Board from '../Board/Board';
import Header from '../Header/Header';
import { Context } from '../../ContextProvider';

export default class Home extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = { isVisualizing: false };
    this.child = React.createRef();
  }

  setIsVisualizing = (value) => {
    this.setState({ isVisualizing: value });
  };

  render() {
    return (
      <React.Fragment>
        <Header />
        <Board ref={this.child} />
      </React.Fragment>
    );
  }
}
