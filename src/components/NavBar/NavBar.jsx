import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Link,
  IconButton,
  Tooltip,
} from '@material-ui/core/';
import GitHubIcon from '@material-ui/icons/GitHub';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    // userSelect: 'none',
  },
}));

export default function NavBar() {
  const classes = useStyles();

  return (
    <AppBar position="static" elevation={0}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" noWrap>
          <Link href="/" color="inherit" underline="none">
            Pathfinding Visualizer
          </Link>
        </Typography>
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
            edge="end"
          >
            <GitHubIcon aria-hidden />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}
