import AppDialog from "./AppDialog"
interface Props{
    /**
     * On Close Clicked
     */
    buttonCloseClicked:()=> void
    /**
     * Is displayed state
     */
    isOpen:boolean
}

/**
 * Dialog indicating all questions were answerd and the progress will be reset, extends AppDialog
 * @param props Props
 * @returns The Dialog (JSX.Element)
 */
export const ResetProgressDialogForce = (props:Props) =>{
    return <AppDialog
    isOpen={props.isOpen}
    buttonCloseClicked={props.buttonCloseClicked} 
    title={"Reset"} 
    buttonText={"Ok"}
    content={"The app will now reset your progress and you can start over with your training."}
    />
}