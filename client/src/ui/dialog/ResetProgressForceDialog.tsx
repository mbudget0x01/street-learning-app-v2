import { useTranslation } from "react-i18next";
import AppDialog from "./AppDialog"
interface Props {
    /**
     * On Close Clicked
     */
    buttonCloseClicked: () => void
    /**
     * Is displayed state
     */
    isOpen: boolean
}

/**
 * Dialog indicating all questions were answerd and the progress will be reset, extends AppDialog
 * @param props Props
 * @returns The Dialog (JSX.Element)
 */
export const ResetProgressDialogForce = (props: Props) => {

    const { t } = useTranslation("dialog");

    return <AppDialog
        isOpen={props.isOpen}
        buttonCloseClicked={props.buttonCloseClicked}
        title={t("ResetProgressDialogForce.title")}
        buttonText={t("Ok")}
        content={t("ResetProgressDialogForce.content")}
    />
}