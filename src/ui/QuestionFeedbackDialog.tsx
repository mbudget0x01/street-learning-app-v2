import AppDialog from "./AppDialog"

interface Props{
    wasCorrect:boolean
    buttonCloseClicked:()=> void
    isOpen:boolean
}

export const QuestionFeedbackDialog = (props:Props) => {
    const textWasCorrect:string = "Your answer was right. Keep up the good work!"
    const textWasNotCorrect:string = "Your answer was wrong. Use the app to memorize the right answer. So next time you know it. Don't give up!"

    return <AppDialog
    isOpen={props.isOpen}
    buttonCloseClicked={props.buttonCloseClicked} 
    title={props.wasCorrect? "Right Answer":"Wrong Answer"} 
    buttonText={"Ok"}
    content={props.wasCorrect ? textWasCorrect:textWasNotCorrect}
    />
}