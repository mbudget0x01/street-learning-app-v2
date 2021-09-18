import { CircularProgress, createStyles, makeStyles, Theme, Typography } from "@material-ui/core"
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    contentWrapper:{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'fixed',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center'
    }
  }),
);

/**
 * Displays a Loading animation indicating the app is Loading
 * @returns JSX.Element
 */
export const DisplayLoading = () => {
    const classes = useStyles();
    const { t } = useTranslation("general");

    return (
        <div className={classes.contentWrapper}>
            <CircularProgress size={'20%'} />
            <Typography >
               {t("DisplayLoading.loadingText")}
            </Typography>
        </div>
    )
}