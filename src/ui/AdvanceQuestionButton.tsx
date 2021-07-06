import { Button, createStyles, makeStyles, Theme } from "@material-ui/core"


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
            },
            width: "100%",
            display: "flex",
            justifyContent: "center"
        },
        button: {
            width: "100%"
        },
    }),
);


interface Props {
    onClickHandler: () => void,
    isDisabled: boolean,
}

export const AdvanceQuestionButton = (props: Props) => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Button variant="contained" color="primary" disabled={props.isDisabled} onClick={props.onClickHandler}>
                Next Question
            </Button>
        </div>
    )
}