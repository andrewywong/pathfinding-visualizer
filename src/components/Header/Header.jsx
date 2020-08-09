import React, { Component } from 'react';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { pause: false };
  }

  setIsVisualizing = (value) => {
    this.setState({ isVisualizing: value });
  };

  render() {
    return <div />;
  }
}
