import AppDialog from "./AppDialog"
interface Props{
    buttonCloseClicked:()=> void
    isOpen:boolean
}

export const ResetProgressDialog = (props:Props) =>{
    return <AppDialog
    isOpen={props.isOpen}
    buttonCloseClicked={props.buttonCloseClicked} 
    title={"Congratulation!"} 
    buttonText={"Ok"}
    content={"You answerd all Questions correct. Congratulations! The app will now reset your progress and you can start over with your training."}
    />
}