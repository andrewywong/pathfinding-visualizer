import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Link,
  IconButton,
  Tooltip,
} from '@material-ui/core/';
import { FaGithub } from 'react-icons/fa';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

export default function NavBar() {
  const classes = useStyles();

  return (
    <AppBar position="static" elevation={0}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6">
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
            <FaGithub aria-hidden />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}
