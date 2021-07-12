import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions";
import React from "react";

interface Props {
    buttonAnswerClicked: (wasCorrect: boolean) => void,
    buttonCloseClicked: () => void,
    isOpen: boolean
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const ManualDecisionDialog = (props: Props) => {
    
    const buttonCorrectClicked = () => {
        props.buttonAnswerClicked(true)
    }

    const buttonWrongClicked = () => {
        props.buttonAnswerClicked(false)
    }
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
                <DialogTitle id="alert-dialog-slide-title">Manual Answer</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <b>Unfortunately the App is not able to resolve if the question was answerd correct.</b><br/>
                        Please Answer this yourself, by pressing the corresponding button.
                        You can close this Window and review your Guess according to the approximate Position we found for the solution.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={buttonWrongClicked} color="primary">Wrong</Button>
                    <Button onClick={buttonCorrectClicked} color="primary">I knew it!</Button>
                    <Button onClick={props.buttonCloseClicked} color="primary">Let me check again!</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}