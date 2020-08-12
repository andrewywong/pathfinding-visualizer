import React from 'react';
import Timer from '../../algorithms/Timer';
import { ALGORITHM_TYPES, DELAY_SPEEDS } from '../../constants';
import { AlgorithmMapping, DelayMapping } from '../../factory';
import {
  Container,
  Row,
  Col,
  Button,
  Dropdown,
  DropdownButton,
} from 'react-bootstrap';
import { IoIosPause, IoIosPlay } from 'react-icons/io';

export default class Header extends React.PureComponent {
  onVisualize = () => {
    const {
      clearBoard,
      setIsVisualizing,
      initPathfinder,
      pathfinder,
      setIsPathVisualized,
      delayInterval,
    } = this.props;
    // if (isVisualizing) {
    //   return;
    // }
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
        // setIsPathVisualized(true);
        setIsVisualizing(false);
      }, //pathfinder.clearTimers()
      finalCounter * delayInterval // delay
    );
    pathfinder.current.timers.push(timer);
    setIsPathVisualized(true);
  };

  onClear = (clearWalls) => {
    const { clearBoard } = this.props;
    // if (pathfinder.current) {
    //   pathfinder.current.clearTimers();
    // }

    clearBoard(clearWalls);
  };

  onClearAll = () => {
    this.onClear(true);
  };

  onClearPath = () => {
    this.onClear(false);
  };

  onPause = () => {
    const { isVisualizing, pathfinder, pause, setPause } = this.props;
    if (!isVisualizing) {
      return;
    }
    if (pause) {
      setPause(false);
      pathfinder.current.resumeTimers();
    } else {
      setPause(true);
      pathfinder.current.pauseTimers();
    }
  };

  render() {
    console.log('header rendered');
    const {
      isVisualizing,
      algorithmType,
      setAlgorithmType,
      pause,
      delayInterval,
      setDelayInterval,
    } = this.props;
    return (
      <Container fluid>
        <Row>
          <Col className="d-flex justify-content-center">
            <DropdownButton
              id="dropdown-algorithm"
              title={algorithmType}
              onSelect={setAlgorithmType}
              disabled={isVisualizing}
            >
              {ALGORITHM_TYPES.map((algorithm) => {
                return (
                  <Dropdown.Item
                    key={algorithm}
                    eventKey={algorithm}
                    active={algorithmType === algorithm}
                  >
                    {AlgorithmMapping[algorithm]}
                  </Dropdown.Item>
                );
              })}
            </DropdownButton>
          </Col>
          <Col className="d-flex justify-content-center">
            <DropdownButton
              id="dropdown-speed"
              title={DelayMapping[delayInterval]}
              onSelect={setDelayInterval}
              disabled={isVisualizing}
            >
              {DELAY_SPEEDS.map((delay) => {
                return (
                  <Dropdown.Item
                    key={delay}
                    eventKey={delay}
                    active={delayInterval === delay}
                  >
                    {DelayMapping[delay]}
                  </Dropdown.Item>
                );
              })}
            </DropdownButton>
          </Col>
          <Col className="d-flex justify-content-center">
            <Button variant="primary" onClick={this.onVisualize}>
              Visualize
            </Button>
          </Col>
          <Col className="d-flex justify-content-center">
            <Button variant="secondary" onClick={this.onClearAll}>
              Clear Board
            </Button>
          </Col>
          <Col className="d-flex justify-content-center">
            <Button variant="secondary" onClick={this.onClearPath}>
              Clear Path
            </Button>
          </Col>
          <Col className="d-flex justify-content-center">
            <Button
              variant="info"
              onClick={this.onPause}
              disabled={!isVisualizing}
            >
              {pause ? <IoIosPlay /> : <IoIosPause />}
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}
