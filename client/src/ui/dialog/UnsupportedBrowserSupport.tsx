import { useTranslation } from "react-i18next";
import AppDialog from "./AppDialog"

interface Props{
    /**
     * Is displayed state
     */
    isOpen:boolean,
    /**
     * on Close clicked
     */
    buttonCloseClicked:()=> void

}

/**
 * Dialog indicating there is use of an unsupported Browser. Extends App Dialog 
 * @param props Props
 * @returns JSX.Element
 */
export const UnsupportedBrowserDialog = (props:Props) => {
    
    const { t } = useTranslation("dialog");
    
    return( <AppDialog 
        buttonText={"Ok"}
        isOpen={props.isOpen}
        content={t("UnsupportedBrowserDialog.content")}
        title={t("UnsupportedBrowserDialog.title")}
        buttonCloseClicked={props.buttonCloseClicked}
        />
    )
}