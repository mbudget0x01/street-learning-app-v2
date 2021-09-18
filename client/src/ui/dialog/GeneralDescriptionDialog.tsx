import AppDialog from "./AppDialog"
import { useTranslation } from 'react-i18next';

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
    const { t } = useTranslation("dialog");
    
    return <AppDialog 
    title={t("GeneralDescriptionDialog.title")}
    buttonText={t("GeneralDescriptionDialog.buttonOk")}
    content={t("GeneralDescriptionDialog.content")}
    isOpen={props.isOpen}
    buttonCloseClicked={props.buttonCloseClicked} />
}