import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
  title: string,
  content: string | JSX.Element,
  buttonText: string
  buttonCloseClicked: () => void
  isOpen: boolean
}

export default function AppDialog(props: Props) {

  //if it is only a content string
  if (typeof props.content === "string") {
    return (
      <div>
        <Dialog
          open={props.isOpen}
          TransitionComponent={Transition}
          keepMounted
          onClose={props.buttonCloseClicked}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">{props.title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">{props.content}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={props.buttonCloseClicked} color="primary">{props.buttonText}</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
  //if i want to pass some complexer contenr
  return (
    <div>
      <Dialog
        open={props.isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.buttonCloseClicked}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{props.title}</DialogTitle>
        {props.content}
        <DialogActions>
          <Button onClick={props.buttonCloseClicked} color="primary">{props.buttonText}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );

}