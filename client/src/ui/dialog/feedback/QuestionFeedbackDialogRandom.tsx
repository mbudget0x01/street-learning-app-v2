import { DialogContent, DialogContentText } from "@material-ui/core"
import { useState } from "react"
import AppDialog from "../AppDialog"
import { FeedbackTextHandler, IFeedbackText } from "./FeedbackTextHandler"

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
export const QuestionFeedbackDialogRandom = (props: Props) => {

    const [feedbackText, setFeedbackText] = useState<IFeedbackText>()
    const [fbHandlerIsLoading, setFbHandlerIsLoading] = useState<boolean>(false)
    const [feedbackTextSet, setFeedbackTextSet] = useState<boolean>(false)
    const [feedbackTextHandler, setFeedbackTextHandler] = useState<FeedbackTextHandler>()


    //yes react doesn't like async singleton instances
    if (feedbackTextHandler !== null && feedbackTextHandler !== undefined && !feedbackTextSet && props.isOpen) {
        let tmpText = props.wasCorrect ? feedbackTextHandler.getPositivFeedbackText() : feedbackTextHandler.getNegativFeedbackText()

        
        if (tmpText !== undefined) {
            setFeedbackText(tmpText)
            setFeedbackTextSet(true)
        }
    }


    if (feedbackTextHandler == null && !fbHandlerIsLoading) {
        setFbHandlerIsLoading(true)
        FeedbackTextHandler.getInstance().then(
            (instance) => {
                setFeedbackTextHandler(instance)
            }
        )
    }

    //const feedbackTextJSX: JSX.Element = <DialogContentText >{feedbackText?.text}</DialogContentText>

    const nextQuestionText: JSX.Element = props.nextQuestion ? <DialogContentText >The next street is: <b>{props.nextQuestion}</b></DialogContentText> : <div />

    return <AppDialog
        isOpen={props.isOpen}
        buttonCloseClicked={() => { setFeedbackTextSet(false); props.buttonCloseClicked(); }}
        title={props.wasCorrect ? "Right Answer" : "Wrong Answer"}
        buttonText={"Ok"}
        content={
            <DialogContent>
                <TextRepresentation obj={feedbackText} />
                {nextQuestionText}
            </DialogContent>
        }
    />
}


interface TextRepresentationProps {
    obj: IFeedbackText | undefined
}

/**
 * Returns a representation for the IFeedbackText object
 * @param props The object to represent
 * @returns  A dialog Content to represent the answer
 */
const TextRepresentation = (props: TextRepresentationProps) => {

    if (props.obj === undefined) {
        return <div />
    }

    if (!props.obj.isQuote) {
        return <DialogContentText >{props.obj.text}</DialogContentText>
    }

    return (
        <DialogContentText >
            {props.obj.text}<br /><br /><i>{props.obj.quoteFrom}</i>
        </DialogContentText>
    )
}