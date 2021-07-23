import { ErrorDialog } from "."
import { GeneralDescriptionDialog } from "./dialog/GeneralDescriptionDialog"
import { ManualDecisionDialog } from "./dialog/ManualDecisionDialog"
import { QuestionFeedbackDialog } from "./dialog/QuestionFeedbackDialog"
import { ResetProgressDialog } from "./dialog/ResetProgressDialog"


export type DialogType = 'error' | 'questionFeedback' | 'generalDescription' | 'manualDecision' | 'resetProgress' | 'none'

interface Props{
    dialogType:DialogType,
    isOpen:boolean,
    onDialogCloseClick: (isTrue:boolean | undefined) => void,
    lastError:string,
    nextQuestion?:string,
    lastAnswerCorrect:boolean
}

export const ContentMainDialogFactory = (props:Props) => {
    
    // I am not happy with this but can't think of a better capsulation
    switch(props.dialogType){
        case "none": {
            //do not render
            return  <div/> 
        }
        case "error":{
            return <ErrorDialog 
            buttonCloseClicked={() => props.onDialogCloseClick(undefined)} 
            isOpen={props.isOpen} 
            errorFriendlyDescription={props.lastError} />
        }
        case "questionFeedback":{
            return <QuestionFeedbackDialog 
            buttonCloseClicked={() => props.onDialogCloseClick(undefined)} 
            isOpen={props.isOpen} wasCorrect={props.lastAnswerCorrect} 
            nextQuestion={props.nextQuestion} />
        }
        case "generalDescription":{
            return <GeneralDescriptionDialog 
            buttonCloseClicked={() => props.onDialogCloseClick(undefined)} 
            isOpen={props.isOpen} />
        }
        case "manualDecision":{
            return <ManualDecisionDialog 
            buttonCloseClicked={() => props.onDialogCloseClick(undefined)} 
            isOpen={props.isOpen} 
            buttonAnswerClicked={props.onDialogCloseClick} />
        }
        case "resetProgress":{
            return <ResetProgressDialog 
            buttonCloseClicked={() => props.onDialogCloseClick(undefined)}
            isOpen={props.isOpen} />
        }

    }
}