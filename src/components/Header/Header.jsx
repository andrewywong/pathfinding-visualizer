import React, { Component } from 'react';

import Timer from '../../algorithms/Timer';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { pause: false, isAlgorithmComplete: false };
  }

  onVisualize = () => {
    const {
      isVisualizing,
      clearBoard,
      setIsVisualizing,
      initPathfinder,
      pathfinder,
      delayInterval,
    } = this.props;
    if (isVisualizing) {
      return;
    }
    clearBoard(false);
    setIsVisualizing(true);

    initPathfinder();
    const finalCounter = pathfinder.current.run();
    const timer = new Timer({
      callback: () => setIsVisualizing(false), //setIsPathVisualized(true) //pathfinder.clearTimers()
      delay: finalCounter * delayInterval,
    });
    pathfinder.current.timers.push(timer);
    this.setState({ isAlgorithmComplete: true });
  };

  onClear = (clearWalls) => {
    const { isVisualizing, clearBoard, pathfinder } = this.props;
    if (isVisualizing && !this.state.isAlgorithmComplete) {
      return;
    }
    if (pathfinder.current && isVisualizing) {
      pathfinder.current.clearTimers();
    }
    this.setState({ isAlgorithmComplete: false });
    if (this.state.pause) {
      // setPause(false);
    }

    clearBoard(clearWalls);
  };

  onClearAll = () => {
    this.onClear(true);
  };

  onClearPath = () => {
    this.onClear(false);
  };

  onPause = () => {
    const { isVisualizing, pathfinder } = this.props;
    if (!isVisualizing || !this.state.isAlgorithmComplete) return;
    if (this.state.pause) {
      // setPause(false);
      pathfinder.current.resumeTimers();
    } else {
      // setPause(true);
      pathfinder.current.pauseTimers();
    }
  };

  render() {
    return <div />;
  }
}
