import React, { Component } from 'react';
import { Context } from '../../ContextProvider';

export default class Header extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div />;
  }
}
