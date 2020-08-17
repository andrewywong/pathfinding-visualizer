import React from 'react';
import Timer from '../../algorithms/Timer';
import {
  ALGORITHM_TYPES,
  DELAY_SPEEDS,
  DRAW_TYPES,
  DrawMapping,
  WeightMapping,
} from '../../constants';
import {
  Grid,
  Button,
  ButtonGroup,
  Select,
  InputLabel,
  FormControl,
} from '@material-ui/core/';
import { Pause, PlayArrow } from '@material-ui/icons/';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  grid: {},
  centergrid: {
    flexShrink: 2,
  },
  pause: { width: '40px', minWidth: '40px' },
});
class Header extends React.PureComponent {
  handleVisualize = () => {
    const {
      clearBoard,
      setIsVisualizing,
      initPathfinder,
      pathfinder,
      setIsPathVisualized,
      delayInterval,
    } = this.props;
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
        pathfinder.current.timers.shift();
      }, //pathfinder.current.clearTimers()
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

  handleSelectAlgorithm = (e) => {
    const { setAlgorithmType } = this.props;
    setAlgorithmType(e.target.value);
  };

  handleSelectSpeed = (e) => {
    const { setDelayInterval } = this.props;
    setDelayInterval(e.target.value);
  };

  render() {
    console.log('header rendered');
    const {
      classes,
      isVisualizing,
      algorithmType,
      pause,
      delayInterval,
      drawType,
      setDrawType,
    } = this.props;
    return (
      <Grid
        container
        justify="center"
        alignItems="center"
        spacing={0}
        // wrap="nowrap"
      >
        <Grid item>
          <FormControl>
            {/* <InputLabel htmlFor="select-algorithm">Algorithm</InputLabel> */}
            <Select
              native
              value={algorithmType}
              onChange={this.handleSelectAlgorithm}
              id="select-algorithm"
              labelId="select-algorithm-label"
            >
              {ALGORITHM_TYPES.map((algorithm) => {
                return (
                  <option key={algorithm.value} value={algorithm.value}>
                    {algorithm.name}
                  </option>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            {/* <InputLabel htmlFor="select-speed">Speed</InputLabel> */}
            <Select
              native
              value={delayInterval}
              onChange={this.handleSelectSpeed}
              id="select-speed"
              labelId="select-speed-label"
            >
              {DELAY_SPEEDS.map((delay) => {
                return (
                  <option key={delay.value} value={delay.value}>
                    {delay.name}
                  </option>
                );
              })}
            </Select>
          </FormControl>
        </Grid>

        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleVisualize}
          >
            Visualize
          </Button>
        </Grid>

        <Grid item>
          <ButtonGroup color="secondary" aria-label="clear button group">
            <Button onClick={() => this.handleClear(true)}>Clear Board</Button>
            <Button onClick={() => this.handleClear(false)}>Clear Path</Button>
          </ButtonGroup>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            onClick={this.handlePause}
            disabled={!isVisualizing}
            className={classes.pause}
          >
            {pause ? <PlayArrow /> : <Pause />}
          </Button>
        </Grid>
      </Grid>
    );
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

export default withStyles(styles)(Header);
