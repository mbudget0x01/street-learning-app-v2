import { DialogContent, DialogContentText } from "@material-ui/core"
import AppDialog from "../AppDialog"

interface Props {
    /**
     * Last answer was correct
     */
    wasCorrect: boolean
    /**
     * On Dialog close click
     */
    buttonCloseClicked: () => void
    /**
     * is open state
     */
    isOpen: boolean
    /**
     * if the next question is not undefined it will be announced
     */
    nextQuestion: string | undefined
}

/**
 * Displays a response to the user if the last guess was right, extends AppDialog
 * @param props 
 * @returns 
 */
export const QuestionFeedbackDialog = (props: Props) => {
    const textWasCorrect: JSX.Element = <DialogContentText >Your answer was <b>right</b>. Keep up the good work!</DialogContentText>
    const textWasNotCorrect: JSX.Element = <DialogContentText >Your answer was <b>wrong</b>. Use the app to memorize the right answer. So next time you know it. Don't give up!</DialogContentText>
    const nextQuestionText: JSX.Element = props.nextQuestion ? <DialogContentText >The next street is: <b>{props.nextQuestion}</b></DialogContentText> : <div />

    return <AppDialog
        isOpen={props.isOpen}
        buttonCloseClicked={props.buttonCloseClicked}
        title={props.wasCorrect ? "Right Answer" : "Wrong Answer"}
        buttonText={"Ok"}
        content={
            <DialogContent>
                {props.wasCorrect ? textWasCorrect : textWasNotCorrect}
                {nextQuestionText}
            </DialogContent>
        }
    />
}