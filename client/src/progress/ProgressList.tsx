import { createStyles, List, ListItem, ListItemIcon, ListItemText, ListSubheader, makeStyles, Theme } from "@material-ui/core";
import { Check, Clear } from "@material-ui/icons";
import { useTranslation } from "react-i18next";
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


/**
 * Props needed to create a List entry
 */
interface QuestionListItemProps{
    /**
     * IQuestion to display
     */
    question: IQuestion,
    /**
     * On Question Click Callback
     */
    onClick: (question:IQuestion) => void,
}

/**
 * List Item representing a Question
 * @param props QuestionListItemProps
 * @returns List Item representing a Question
 */
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
    /**
     * List of Questions to display
     */
    questions:IQuestion[]
    /**
     * Callback when a Question got clicked
     * Has clicked the question as Parameter
     */
    onQuestionClick: (question:IQuestion) => void,
}

/**
 * List representing Questions and their progress
 * @param props Props
 * @returns List representing Questions and their progress
 */
export const ProgressList = (props:Props) =>{
    const classes = useStyles();
    const { t } = useTranslation("main");

    return (
        <div className={classes.root}>
            <List component="nav" aria-label="main question-list" subheader={
                <ListSubheader component="div" id="question-list-subheader" disableSticky={true}>
                    {t("ProgressList.header")}
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

