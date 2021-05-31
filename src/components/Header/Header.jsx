import React from 'react';
import Timer from '../../algorithms/Timer';
import {
  ALGORITHM_TYPES,
  DELAY_SPEEDS,
  WEIGHT_MAPPING,
  WEIGHT_REVERSE,
  MARKS,
  NODE_WALL,
} from '../../constants';
import {
  Grid,
  Button,
  ButtonGroup,
  Select,
  // InputLabel,
  FormControl,
  Typography,
  Slider,
} from '@material-ui/core';
import { Pause, PlayArrow } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  grid: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  center: {
    flex: '0 2',
  },
  pause: { width: 40, minWidth: 40 },
  slider: { width: 200 },
});
class Header extends React.PureComponent {
  // Event handlers
  handleVisualize = () => {
    const {
      clearBoard,
      setIsVisualizing,
      initPathfinder,
      pathfinder,
      setCanDragToVisualize,
      delayInterval,
    } = this.props;

    clearBoard(false);
    setIsVisualizing(true);

    initPathfinder();
    const finalCounter = pathfinder.current.run();
    const timer = new Timer(
      () => {
        setIsVisualizing(false);
        pathfinder.current.timers.shift();
        // pathfinder.current.clearTimers()
      }, // callback
      finalCounter * delayInterval // delay
    );
    pathfinder.current.timers.push(timer);
    setCanDragToVisualize(true);
  };

  handleClear = (clearWalls) => {
    const { clearBoard, setCanDragToVisualize } = this.props;
    clearBoard(clearWalls);
    setCanDragToVisualize(false);
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

  handleSelectDrawType = (e, value) => {
    const { setDrawType } = this.props;
    setDrawType(WEIGHT_REVERSE[value]);
  };

  valuetext(value) {
    if (value === WEIGHT_MAPPING[NODE_WALL]) return 'Wall';
    return value;
  }

  render() {
    const {
      classes,
      isVisualizing,
      algorithmType,
      pause,
      delayInterval,
      drawType,
    } = this.props;
    return (
      <Grid
        container
        justify="center"
        alignItems="center"
        spacing={2}
        wrap="nowrap"
        className={classes.grid}
      >
        <Grid container item justify="flex-end" alignItems="center" spacing={2}>
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
              variant="outlined"
              onClick={this.handlePause}
              disabled={!isVisualizing}
              className={classes.pause}
            >
              {pause ? <PlayArrow /> : <Pause />}
            </Button>
          </Grid>
        </Grid>
        <Grid
          container
          item
          justify="center"
          alignItems="center"
          spacing={2}
          className={classes.center}
        >
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleVisualize}
            >
              Visualize
            </Button>
          </Grid>
        </Grid>
        <Grid
          container
          item
          justify="flex-start"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <ButtonGroup color="secondary" aria-label="clear button group">
              <Button onClick={() => this.handleClear(true)}>
                Clear Board
              </Button>
              <Button onClick={() => this.handleClear(false)}>
                Clear Path
              </Button>
            </ButtonGroup>
          </Grid>

          <Grid item>
            <div className={classes.slider}>
              <Typography variant="subtitle2" id="weight-slider">
                Weight
              </Typography>
              <Slider
                value={WEIGHT_MAPPING[drawType]}
                onChange={this.handleSelectDrawType}
                getAriaValueText={this.valuetext}
                aria-labelledby="weight-slider"
                step={10}
                valueLabelDisplay="off"
                marks={MARKS}
                min={10}
                max={60}
                track={false}
              />
            </div>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Header);
