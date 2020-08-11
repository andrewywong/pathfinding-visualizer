import React, { Component } from 'react';

import Pathfinder from '../../algorithms/Pathfinder';
import Timer from '../../algorithms/Timer';

import { Container, Row, Col, Button } from 'react-bootstrap';

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
    // if (pathfinder.current) {
    //   pathfinder.current.clearTimers();
    // }
    clearBoard(false);
    setIsVisualizing(true);

    initPathfinder();
    const finalCounter = pathfinder.current.run();
    const timer = new Timer(
      // callback
      () => {
        setIsPathVisualized(true);
        setIsVisualizing(false);
      }, //pathfinder.clearTimers()
      finalCounter * delayInterval // delay
    );
    pathfinder.current.timers.push(timer);
    // setIsPathVisualized(true);
  };

  onClear = (clearWalls) => {
    const { clearBoard, pathfinder } = this.props;
    if (pathfinder.current) {
      pathfinder.current.clearTimers();
    }
    if (this.state.pause) {
      this.setState({ pause: false });
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
      this.setState({ pause: false });
      pathfinder.current.resumeTimers();
    } else {
      this.setState({ pause: true });
      pathfinder.current.pauseTimers();
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col className="d-flex justify-content-center">
            <Button variant="primary" onClick={this.onVisualize}>
              Visualize
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}
