import AppDialog from "./AppDialog"

interface Props{
    isOpen:boolean,
    buttonCloseClicked:()=> void

}

export const UnsupportedBrowserDialog = (props:Props) => {
    return( <AppDialog 
        buttonText={"Ok"}
        isOpen={props.isOpen}
        content={"You are running an unsupported Browser Version. If possible please change to a diffrent browser!(e.g. Firefox, Chrome,...). Continuing with this browser can lead to a bad experience."}
        title={"Unsupported Browser."}
        buttonCloseClicked={props.buttonCloseClicked}
        />
    )
}