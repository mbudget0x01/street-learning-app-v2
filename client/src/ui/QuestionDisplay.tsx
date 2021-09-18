import { Button, Card, createStyles, Hidden, makeStyles, Typography } from "@material-ui/core"
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import WebAssetIcon from '@material-ui/icons/WebAsset';
import { useTranslation } from "react-i18next";

interface Props {
    /**
     * The question that is active
     */
    activeQuestion: string | undefined,
    /**
     * True if is disabled
     */
    isDisabled: boolean,
    /**
     * Indicating the user clicked the button check
     */
    onCheckCklickHandler: () => void,
    /**
     * Inidicating the Button Manual Answer was clicked
     */
    onDisplayManualAnswerClickHandler: () => void,
    /**
     * True if there is need for a manual answer
     */
    manualAnswerPending: boolean,
}

const useStyles = makeStyles(() =>
    createStyles({
        card: {
            width: "100%",
            display: "flex",
            alignItems: 'center',
            marginBottom: '5px',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
        },
        cardDivText: {
            columnGap: '5px',
            paddingLeft: '5px',
            display: 'flex',
            paddingRight: '5px',
        },
        cardDivButton: {
            columnGap: '20px',
            paddingLeft: '5px',
            display: 'flex',
            paddingRight: '5px',
        },
        button: {
            marginTop: '5px',
            marginBottom: '5px',
        }
    }),
);
/**
 * UI needed to interact with the game, buttons and display of the question
 * @param props Props
 * @returns A Card containing all necessary controls
 */
export const QuestionDisplay = (props: Props) => {
    const classes = useStyles()

    const { t } = useTranslation("main");

    return (
        <Card variant="outlined" className={classes.card}>
            <div className={classes.cardDivText}>
                <Hidden xsDown>
                    <Typography variant="h6">{t("QuestionDisplay.activeQuestionCaption")}</Typography>
                </Hidden>
                <Typography variant="h6">{props.activeQuestion ? props.activeQuestion : t("QuestionDisplay.noFileLoadedText")}</Typography>
            </div>
            <div className={classes.cardDivButton}>
                <Button variant="contained"
                    color="primary"
                    disabled={props.manualAnswerPending || props.isDisabled}
                    onClick={props.onCheckCklickHandler}
                    className={classes.button}
                    startIcon={<Hidden xsDown><CheckCircleOutlineOutlinedIcon /></Hidden>}>
                    <Hidden smUp><CheckCircleOutlineOutlinedIcon /></Hidden>
                    <Hidden xsDown>{t("QuestionDisplay.buttonCheckText")}</Hidden>
                </Button>
                <Button variant="contained"
                    color="primary"
                    disabled={!props.manualAnswerPending}
                    onClick={props.onDisplayManualAnswerClickHandler}
                    className={classes.button}
                    startIcon={<Hidden xsDown><WebAssetIcon /></Hidden>}>
                    <Hidden smUp><WebAssetIcon /></Hidden>
                    <Hidden xsDown>{t("QuestionDisplay.buttonManualText")}</Hidden>
                </Button>
            </div>
        </Card>
    )
}