import React from 'react';
import Timer from '../../algorithms/Timer';
import {
  ALGORITHM_TYPES,
  DELAY_SPEEDS,
  DRAW_TYPES,
  AlgorithmMapping,
  DelayMapping,
  DrawMapping,
  WeightMapping,
} from '../../constants';

export default class Header extends React.PureComponent {
  handleVisualize = () => {
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

  handleClear = (clearWalls) => {
    const { clearBoard } = this.props;
    // if (pathfinder.current) {
    //   pathfinder.current.clearTimers();
    // }

    clearBoard(clearWalls);
  };

  handlePause = () => {
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
      drawType,
      setDrawType,
    } = this.props;
    return <div></div>;
    // return (
    //   <Container fluid className="my-3">
    //     <Row>
    //       <Col className="d-flex justify-content-center">
    //         <DropdownButton
    //           id="dropdown-algorithm"
    //           title={algorithmType}
    //           onSelect={setAlgorithmType}
    //           // disabled={isVisualizing}
    //         >
    //           {ALGORITHM_TYPES.map((algorithm) => {
    //             return (
    //               <Dropdown.Item
    //                 key={algorithm}
    //                 eventKey={algorithm}
    //                 active={algorithmType === algorithm}
    //               >
    //                 {AlgorithmMapping[algorithm]}
    //               </Dropdown.Item>
    //             );
    //           })}
    //         </DropdownButton>
    //       </Col>
    //       <Col className="d-flex justify-content-center">
    //         <DropdownButton
    //           id="dropdown-speed"
    //           title={DelayMapping[delayInterval]}
    //           onSelect={setDelayInterval}
    //           // disabled={isVisualizing}
    //         >
    //           {DELAY_SPEEDS.map((delay) => {
    //             return (
    //               <Dropdown.Item
    //                 key={delay}
    //                 eventKey={delay}
    //                 active={delayInterval === delay}
    //               >
    //                 {DelayMapping[delay]}
    //               </Dropdown.Item>
    //             );
    //           })}
    //         </DropdownButton>
    //       </Col>
    //       <Col className="d-flex justify-content-center">
    //         <Button variant="primary" onClick={this.handleVisualize}>
    //           Visualize
    //         </Button>
    //       </Col>
    //       <Col className="d-flex justify-content-center">
    //         <Button variant="secondary" onClick={() => this.handleClear(true)}>
    //           Clear Board
    //         </Button>
    //       </Col>
    //       <Col className="d-flex justify-content-center">
    //         <Button variant="secondary" onClick={() => this.handleClear(false)}>
    //           Clear Path
    //         </Button>
    //       </Col>
    //       <Col className="d-flex justify-content-center">
    //         <Button
    //           variant="info"
    //           onClick={this.handlePause}
    //           disabled={!isVisualizing}
    //           className="d-flex align-items-center"
    //         >
    //           {pause ? <IoIosPlay /> : <IoIosPause />}
    //         </Button>
    //       </Col>
    //       <Col className="d-flex justify-content-center">
    //         <DropdownButton
    //           id="dropdown-draw"
    //           title={DrawMapping[drawType]}
    //           onSelect={setDrawType}
    //         >
    //           {DRAW_TYPES.map((draw) => {
    //             return (
    //               <Dropdown.Item
    //                 key={draw}
    //                 eventKey={draw}
    //                 active={drawType === draw}
    //               >
    //                 {'[' + WeightMapping[draw] + '] ' + DrawMapping[draw]}
    //               </Dropdown.Item>
    //             );
    //           })}
    //         </DropdownButton>
    //       </Col>
    //     </Row>
    //   </Container>
    // );
  }
}
