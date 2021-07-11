import { Button, Card, createStyles, makeStyles, Theme, Typography } from "@material-ui/core"
import { useState } from "react";

interface Props{
    activeQuestion:string | undefined,
    isDisabled:boolean,
    onCheckCklickHandler: () => void,
    onAdvanceClickHandler: () => void,
    onDisplayManualAnswerClickHandler: () => void,
    manualAnswerPending:boolean,
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            width: "100%",
            display: "flex",
            alignItems: 'center',
            columnGap: '20px',
            paddingLeft: '5px',
            marginBottom: '5px',
        },
        button: {
            marginTop: '5px',
            marginBottom: '5px',
        }
    }),
);

export const QuestionDisplay = (props:Props) => {
    const classes = useStyles()
    const [answerd, setAnswerd] = useState<boolean>(false)

    const onCheckCklickHandler = () =>{
        props.onCheckCklickHandler()
        setAnswerd(true)
    }

    const onAdvanceClickHandler = () =>{
        props.onAdvanceClickHandler()
        setAnswerd(false)
    }

    return(
        <Card variant="outlined" className={classes.card}>
            <Typography variant="h6">{"Active Question: " + props.activeQuestion }</Typography>
            <Button variant="contained" color="primary" disabled={answerd || props.isDisabled} onClick={onCheckCklickHandler} className={classes.button}>Check</Button>
            <Button variant="contained" color="primary" disabled={!answerd || props.isDisabled} onClick={onAdvanceClickHandler}>Next Question</Button>
            <Button variant="contained" color="primary" disabled={!props.manualAnswerPending} onClick={props.onDisplayManualAnswerClickHandler}>Answer Manually</Button>
        </Card>
    )
}