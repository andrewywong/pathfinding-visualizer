import React from 'react';
import './Node.css';
import {
  NODE_INITIAL,
  NODE_SHORTEST,
  NODE_VISITED,
  NODE_START,
  NODE_FINISH,
} from '../../constants';

export default class Node extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      type: NODE_INITIAL,
      isVisited: false,
      isShortest: false,
      isAnimated: true,
    };

    const { rowIdx, colIdx } = this.props;
    let { updateNodeCache } = this.props;
    updateNodeCache.set(`${rowIdx}-${colIdx}`, {
      setType: this.setType,
      setIsVisited: this.setIsVisited,
      setIsShortest: this.setIsShortest,
      forceNodeUpdate: this.forceNodeUpdate,
    });
  }

  // Set state methods
  setType = (value) => {
    this.setState({ type: value });
  };

  setIsVisited = (value) => {
    this.setState({ isVisited: value.isVisited, isAnimated: value.isAnimated });
  };

  setIsShortest = (value) => {
    this.setState({
      isShortest: value.isShortest,
      isAnimated: value.isAnimated,
    });
  };

  forceNodeUpdate = () => {
    this.forceUpdate();
  };

  // Helper methods
  getNodeClassNames() {
    const { rowIdx, colIdx, start, finish } = this.props;
    if (rowIdx === start.y && colIdx === start.x) {
      return ' ' + NODE_START;
    }
    if (rowIdx === finish.y && colIdx === finish.x) {
      return ' ' + NODE_FINISH;
    }
    if (this.state.type === NODE_INITIAL) {
      return '';
    }
    return ' ' + this.state.type;
  }

  getPathClassNames() {
    let extraClassNames = '';
    if (this.state.isVisited) {
      extraClassNames += ' ' + NODE_VISITED;
      if (!this.state.isAnimated) {
        extraClassNames += '-unanimated';
      }
    }
    if (this.state.isShortest) {
      extraClassNames += ' ' + NODE_SHORTEST;
      if (!this.state.isAnimated) {
        extraClassNames += '-unanimated';
      }
    }
    return extraClassNames;
  }

  render() {
    // console.log('node rendered');
    const { rowIdx, colIdx } = this.props;
    return (
      <div
        id={`node-${rowIdx}-${colIdx}`}
        className={`board__node${this.getNodeClassNames()}`}
        data-row-idx={rowIdx}
        data-col-idx={colIdx}
        // data-type={this.state.type}
      >
        <div className={`board__path${this.getPathClassNames()}`} />
      </div>
    );
  }
}
