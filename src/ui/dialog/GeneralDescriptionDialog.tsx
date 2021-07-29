import AppDialog from "./AppDialog"

interface Props{
    /**
     * On close clicked
     */
    buttonCloseClicked:()=> void
    /**
     * state value if is displayed
     */
    isOpen:boolean
}
/**
 * Displays the General game description extends AppDialog
 * @param props Props
 * @returns A Dialog
 */
export const GeneralDescriptionDialog = (props:Props) => {
    return <AppDialog 
    title={"Welcome"}
    buttonText={"Let's go!"}
    content={"Welcome to the Street Learning App. Here you can learn some streets. " +
    "Before you will be able to start learning, you must choose a learning file. " + 
    "All available files can be found in the drawer on the left side. " +
    "To make a guess, just click on the map to place your Marker. " +
    "Then you can adjust the markers position by dragging it. " + 
    "Finally, click on the check Button to validate your guess. " +
    "Have fun!"}
    isOpen={props.isOpen}
    buttonCloseClicked={props.buttonCloseClicked} />
}