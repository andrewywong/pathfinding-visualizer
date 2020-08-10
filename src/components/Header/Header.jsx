import React, { Component } from 'react';

import Timer from '../../algorithms/Timer';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { pause: false };
  }

  onVisualize = () => {
    const {
      isVisualizing,
      clearBoard,
      setIsVisualizing,
      initPathfinder,
      pathfinder,
      setIsPathVisualized,
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
      callback: () => {
        setIsPathVisualized(true);
        setIsVisualizing(false);
      }, //pathfinder.clearTimers()
      delay: finalCounter * delayInterval,
    });
    pathfinder.current.timers.push(timer);
  };

  onClear = (clearWalls) => {
    const { clearBoard, pathfinder } = this.props;
    if (pathfinder.current) {
      pathfinder.current.clearTimers();
    }
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
    if (!isVisualizing) {
      return;
    }
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
