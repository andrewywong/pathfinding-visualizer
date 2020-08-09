import React, { Component } from 'react';
import Board from '../Board/Board';
import Header from '../Header/Header';
import { Context } from '../../ContextProvider';

export default class Home extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.isVisualizing = false;
    this.state = { isVisualizing: false, isHelpShowing: false };
    this.child = React.createRef();
    this.test = { x: -1, y: -1 };
  }

  setIsVisualizing = (value) => {
    this.setState({ isVisualizing: value });
  };

  render() {
    return (
      <React.Fragment>
        <Header />
        <Board ref={this.child} test={this.test} />
      </React.Fragment>
    );
  }
}
