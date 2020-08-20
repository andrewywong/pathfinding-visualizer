import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Link,
  IconButton,
  Tooltip,
} from '@material-ui/core/';
import { GitHub, Help } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  // toolbar: {
  //   display: 'flex',
  //   justifyContent: 'space-between',
  // },
  separator: {
    flex: 1,
  },
}));

export default function NavBar(props) {
  const classes = useStyles();
  const { handleHelpOpen } = props;

  return (
    <AppBar position="static" elevation={0}>
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap>
          <Link href="/pathfinding-visualizer" color="inherit" underline="none">
            Pathfinding Visualizer
          </Link>
        </Typography>
        <div className={classes.separator} />
        <Tooltip
          title="Github"
          aria-label="t-github"
          placement="bottom"
          enterDelay={250}
          arrow
        >
          <IconButton
            href="https://github.com/andrewywong/pathfinding-visualizer"
            color="inherit"
          >
            <GitHub aria-hidden />
          </IconButton>
        </Tooltip>
        <Tooltip
          title="Help"
          aria-label="t-help"
          placement="bottom"
          enterDelay={250}
          arrow
        >
          <IconButton onClick={handleHelpOpen} edge="end" color="inherit">
            <Help aria-hidden />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}
