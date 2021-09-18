import { useTranslation } from "react-i18next";
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

    const { t } = useTranslation("dialog");

    return <AppDialog
    isOpen={props.isOpen}
    buttonCloseClicked={props.buttonCloseClicked} 
    title={t("ErrorDialog.title")} 
    buttonText={t("Ok")}
    content={ t("ErrorDialog.contentPrefix") + t(props.errorFriendlyDescription)}
    />
}