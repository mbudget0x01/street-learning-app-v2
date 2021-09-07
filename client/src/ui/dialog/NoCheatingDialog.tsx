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
export const NoCheatingDialog = (props:Props) => {
    return <AppDialog 
    title={"No Exploits!"}
    buttonText={"I promise!"}
    content={"It seems as you tried to use an exploit. This is a big No No! Do not cheat ;-)"}
    isOpen={props.isOpen}
    buttonCloseClicked={props.buttonCloseClicked} />
}