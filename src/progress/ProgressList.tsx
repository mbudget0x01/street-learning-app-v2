import { createStyles, List, ListItem, ListItemIcon, ListItemText, ListSubheader, makeStyles, Theme } from "@material-ui/core";
import { Check, Clear } from "@material-ui/icons";
import { IQuestion } from "./IQuestion";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
    }),
);


interface QuestionListItemProps{
    question: IQuestion,
    onClick: (question:IQuestion) => void,
}

const QuestionListItem = (props: QuestionListItemProps) => {
    return (
        <ListItem button onClick={(_event) => props.onClick(props.question)}>
            <ListItemIcon >
                {props.question.answerdCorrect ? <Check/> : <Clear/>}
            </ListItemIcon>
            <ListItemText primary={props.question.street} />
        </ListItem>
    )
}

interface Props{
    questions:IQuestion[]
    onQuestionClick: (question:IQuestion) => void,
}

export const ProgressList = (props:Props) =>{
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <List component="nav" aria-label="main question-list" subheader={
                <ListSubheader component="div" id="question-list-subheader" disableSticky={true}>
                    Questions
                </ListSubheader>
            }>
                {
                    props.questions.map((question:IQuestion) => (
                        <QuestionListItem question={question} key={question.street} onClick={props.onQuestionClick}/>
                    ))
                }
            </List>
        </div>
    );
}

