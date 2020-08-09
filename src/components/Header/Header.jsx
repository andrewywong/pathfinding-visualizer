import React, { Component } from 'react';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { isVisualizing: false, pause: false };
  }

  setIsVisualizing = (value) => {
    this.setState({ isVisualizing: value });
  };

  render() {
    return <div />;
  }
}
