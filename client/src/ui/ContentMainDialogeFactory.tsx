import { ErrorDialog } from "."
import { GeneralDescriptionDialog } from "./dialog/GeneralDescriptionDialog"
import { ManualDecisionDialog } from "./dialog/ManualDecisionDialog"
import { QuestionFeedbackDialog } from "./dialog/feedback/QuestionFeedbackDialog"
import { ResetProgressDialog } from "./dialog/ResetProgressDialog"
import { ResetProgressDialogForce } from "./dialog/ResetProgressForceDialog"
import { QuestionFeedbackDialogRandom } from "./dialog/feedback/QuestionFeedbackDialogRandom"
import { NoCheatingDialog } from "./dialog/NoCheatingDialog"


export type DialogType = 'error' | 'questionFeedback' | 'questionFeedbackRandom' | 'generalDescription' | 'manualDecision' | 'resetProgress' | 'resetProgressForce' | 'noExploit' | 'none'

interface Props {
    /**
     * The Dialog Type to display
     */
    dialogType: DialogType,
    /**
     * Dialog is Open State
     */
    isOpen: boolean,
    /**
     * Returns a boolean if available or undefined if just a normal void
     */
    onDialogCloseClick: (isTrue: boolean | undefined) => void,
    /**
     * Last error text
     */
    lastError: string,
    /**
     * next Question to answer
     */
    nextQuestion?: string,
    /**
     * True if last question was answerd right
     */
    lastAnswerCorrect: boolean
}

/**
 * Capsulates Dialogs for Main Content
 * @param props Props
 * @returns A Dialog according to props
 */
export const ContentMainDialogFactory = (props: Props) => {

    // I am not happy with this but can't think of a better capsulation
    switch (props.dialogType) {
        case "none": {
            //do not render
            return <div />
        }
        case "error": {
            return <ErrorDialog
                buttonCloseClicked={() => props.onDialogCloseClick(undefined)}
                isOpen={props.isOpen}
                errorFriendlyDescription={props.lastError} />
        }
        case "questionFeedback": {
            return <QuestionFeedbackDialog
                buttonCloseClicked={() => props.onDialogCloseClick(undefined)}
                isOpen={props.isOpen} wasCorrect={props.lastAnswerCorrect}
                nextQuestion={props.nextQuestion} />
        }
        case "questionFeedbackRandom": {
            return <QuestionFeedbackDialogRandom
                buttonCloseClicked={() => props.onDialogCloseClick(undefined)}
                isOpen={props.isOpen} wasCorrect={props.lastAnswerCorrect}
                nextQuestion={props.nextQuestion} />
        }
        case "generalDescription": {
            return <GeneralDescriptionDialog
                buttonCloseClicked={() => props.onDialogCloseClick(undefined)}
                isOpen={props.isOpen} />
        }
        case "manualDecision": {
            return <ManualDecisionDialog
                buttonCloseClicked={() => props.onDialogCloseClick(undefined)}
                isOpen={props.isOpen}
                buttonAnswerClicked={props.onDialogCloseClick} />
        }
        case "resetProgress": {
            return <ResetProgressDialog
                buttonCloseClicked={() => props.onDialogCloseClick(undefined)}
                isOpen={props.isOpen} />
        }
        case "resetProgressForce": {
            return <ResetProgressDialogForce
                buttonCloseClicked={() => props.onDialogCloseClick(undefined)}
                isOpen={props.isOpen} />
        }
        case "noExploit": {
            return <NoCheatingDialog
                buttonCloseClicked={() => props.onDialogCloseClick(undefined)}
                isOpen={props.isOpen} />
        }

    }
}