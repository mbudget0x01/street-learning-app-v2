import { Button, Card, createStyles, makeStyles, Theme, Typography } from "@material-ui/core"
import { AdvanceQuestionButton } from "./AdvanceQuestionButton";

interface Props{
    activeQuestion:string | undefined,
    isDisabled:boolean,
    onCheckCklickHandler: () => void,
    onAdvanceClickHandler: () => void,
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
    return(
        <Card variant="outlined" className={classes.card}>
            <Typography variant="h6">{"Active Question: " + props.activeQuestion }</Typography>
            <Button variant="contained" color="primary" disabled={props.isDisabled} onClick={props.onCheckCklickHandler} className={classes.button}>Display</Button>
            <AdvanceQuestionButton isDisabled={props.isDisabled} onClickHandler={props.onAdvanceClickHandler} />
        </Card>
    )
}