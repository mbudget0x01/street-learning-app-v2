import { Button, Card, createStyles, Hidden, makeStyles, Theme, Typography } from "@material-ui/core"
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import LabelImportantOutlinedIcon from '@material-ui/icons/LabelImportantOutlined';
import WebAssetIcon from '@material-ui/icons/WebAsset';
import { useState } from "react";

interface Props {
    activeQuestion: string | undefined,
    isDisabled: boolean,
    onCheckCklickHandler: () => void,
    onAdvanceClickHandler: () => void,
    onDisplayManualAnswerClickHandler: () => void,
    manualAnswerPending: boolean,
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            width: "100%",
            display: "flex",
            alignItems: 'center',
            marginBottom: '5px',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
        },
        cardDivText: {
            columnGap: '5px',
            paddingLeft: '5px',
            display: 'flex',
            paddingRight: '5px',
        },
        cardDivButton: {
            columnGap: '20px',
            paddingLeft: '5px',
            display: 'flex',
            paddingRight: '5px',
        },
        button: {
            marginTop: '5px',
            marginBottom: '5px',
        }
    }),
);

export const QuestionDisplay = (props: Props) => {
    const classes = useStyles()
    const [answerd, setAnswerd] = useState<boolean>(false)

    const onCheckCklickHandler = () => {
        props.onCheckCklickHandler()
        setAnswerd(true)
    }

    const onAdvanceClickHandler = () => {
        props.onAdvanceClickHandler()
        setAnswerd(false)
    }

    return (
        <Card variant="outlined" className={classes.card}>
            <div className={classes.cardDivText}>
                <Hidden xsDown>
                    <Typography variant="h6">{"Active Question:"}</Typography>
                </Hidden>
                <Typography variant="h6">{props.activeQuestion ? props.activeQuestion : "No file loaded."}</Typography>
            </div>
            <div className={classes.cardDivButton}>
                <Button variant="contained"
                    color="primary"
                    disabled={answerd || props.isDisabled}
                    onClick={onCheckCklickHandler}
                    className={classes.button}
                    startIcon={<Hidden xsDown><CheckCircleOutlineOutlinedIcon /></Hidden>}>
                    <Hidden smUp><CheckCircleOutlineOutlinedIcon /></Hidden>
                    <Hidden xsDown>Check</Hidden>
                </Button>
                <Button variant="contained"
                    color="primary"
                    disabled={!answerd || props.isDisabled}
                    onClick={onAdvanceClickHandler}
                    className={classes.button}
                    startIcon={<Hidden xsDown><LabelImportantOutlinedIcon /></Hidden>}>
                    <Hidden smUp><LabelImportantOutlinedIcon /></Hidden>
                    <Hidden xsDown>Next Question</Hidden>
                </Button>
                <Button variant="contained"
                    color="primary"
                    disabled={!props.manualAnswerPending}
                    onClick={props.onDisplayManualAnswerClickHandler}
                    className={classes.button}
                    startIcon={<Hidden xsDown><WebAssetIcon /></Hidden>}>
                    <Hidden smUp><WebAssetIcon /></Hidden>
                    <Hidden xsDown>Answer Manually</Hidden>
                </Button>
            </div>
        </Card>
    )
}