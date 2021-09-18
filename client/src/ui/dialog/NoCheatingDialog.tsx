import { useTranslation } from "react-i18next";
import AppDialog from "./AppDialog"

interface Props {
    /**
     * On close clicked
     */
    buttonCloseClicked: () => void
    /**
     * state value if is displayed
     */
    isOpen: boolean
}
/**
 * Displays the General game description extends AppDialog
 * @param props Props
 * @returns A Dialog
 */
export const NoCheatingDialog = (props: Props) => {
    const { t } = useTranslation("dialog");

    return <AppDialog
        title={t("NoCheatingDialog.title")}
        buttonText={t("NoCheatingDialog.buttonOk")}
        content={t("NoCheatingDialog.content")}
        isOpen={props.isOpen}
        buttonCloseClicked={props.buttonCloseClicked} />
}