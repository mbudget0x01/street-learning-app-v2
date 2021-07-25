import AppDialog from "./AppDialog"

interface Props{
    errorFriendlyDescription:string
    buttonCloseClicked:()=> void
    isOpen:boolean
}

export const ErrorDialog = (props:Props) => {
    return <AppDialog
    isOpen={props.isOpen}
    buttonCloseClicked={props.buttonCloseClicked} 
    title={"Error"} 
    buttonText={"Ok"}
    content={`The following Error occured: ${props.errorFriendlyDescription}`}
    />
}