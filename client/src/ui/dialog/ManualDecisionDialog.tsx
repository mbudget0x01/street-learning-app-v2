import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions";
import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
    /**
     * When an answer was chosen indicating if answer was Correct or not
     */
    buttonAnswerClicked: (wasCorrect: boolean) => void,
    /**
     * On Close without answer
     */
    buttonCloseClicked: () => void,
    /**
     * State if it is displayed
     */
    isOpen: boolean
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

/**
 * Displays a Dialog indicating a Manaual decision must be made for the game
 * @param props Props
 * @returns A Dialog
 */
export const ManualDecisionDialog = (props: Props) => {

    const { t } = useTranslation("dialog");

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
                <DialogTitle id="alert-dialog-slide-title">{t("ManualDecisionDialog.title")}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <b>{t("ManualDecisionDialog.content1")}</b><br /><br />
                        {t("ManualDecisionDialog.content2")}<br />
                        {t("ManualDecisionDialog.content3")}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={buttonWrongClicked} color="primary">{t("ManualDecisionDialog.buttonWrong")}</Button>
                    <Button onClick={buttonCorrectClicked} color="primary">{t("ManualDecisionDialog.buttonRight")}</Button>
                    <Button onClick={props.buttonCloseClicked} color="primary">{t("ManualDecisionDialog.buttonHide")}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}