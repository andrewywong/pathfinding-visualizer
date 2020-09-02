import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon aria-hidden />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

export default function HelpModal(props) {
  const { helpOpen, handleHelpClose } = props;
  return (
    <div>
      <Dialog
        onClose={handleHelpClose}
        aria-labelledby="help-dialog"
        open={helpOpen}
        scroll="paper"
      >
        <DialogTitle id="help-dialog" onClose={handleHelpClose}>
          Help
        </DialogTitle>
        <DialogContent dividers>
          <Typography>
            1. Click on the board to add and remove walls/weights. <br />
            2. Click and drag the start/end nodes to move them. <br />
            3. Choose the algorithm and speed from the drop-down menus. <br />
            4. Choose between adding walls or weights from the slider. <br />
            5. Choose the cost of the weights from the slider. <br />
            6. Empty nodes &quot;cost&quot; 1 to traverse, whereas weights are
            more costly to pass through. Walls are impenetrable, meaning they
            cannot be traversed. <br />
            7. Weighted algorithms (Djikstra and A*) will take weight nodes into
            account. <br />
            8. Unweighted algorithms (BFS and DFS) will ignore weight nodes
            (i.e. treat the nodes as empty). <br />
            9. DFS does not guarantee the shortest path, whereas the other
            algorithms do. <br />
            10. When the visualizer runs, it captures and uses a snapshot of the
            board and configurations.
          </Typography>
        </DialogContent>
      </Dialog>
    </div>
  );
}
