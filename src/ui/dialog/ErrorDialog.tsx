import AppDialog from "./AppDialog"

interface Props{
    /**
     * A user friendly description of the error
     */
    errorFriendlyDescription:string
    /**
     * On close clicked
     */
    buttonCloseClicked:()=> void
    /**
     * open state
     */
    isOpen:boolean
}

/**
 * Extends AppDialog for Error Display
 * @param props Props
 * @returns An Error Dialog
 */
export const ErrorDialog = (props:Props) => {
    return <AppDialog
    isOpen={props.isOpen}
    buttonCloseClicked={props.buttonCloseClicked} 
    title={"Error"} 
    buttonText={"Ok"}
    content={`The following Error occured: ${props.errorFriendlyDescription}`}
    />
}