import React, { Component } from 'react';
import Board from '../Board/Board';
import Header from '../Header/Header';
import { Context } from '../../ContextProvider';

export default class Home extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {};
    this.child = React.createRef();
  }

  handleMouseUp = () => {
    this.child.current.handleMouseUp();
  };
  handleTouchEnd = this.handleMouseUp;

  render() {
    return (
      <div
        id="home"
        onMouseUp={this.handleMouseUp}
        onTouchEnd={this.handleTouchEnd}
      >
        <Header />
        <Board ref={this.child} />
      </div>
    );
  }
}
