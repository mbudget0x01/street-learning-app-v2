import { createStyles, List, ListItem, ListItemIcon, ListItemText, ListSubheader, makeStyles, Theme } from "@material-ui/core";
import { HighlightOff } from "@material-ui/icons";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
    }),
);

interface Props {
    /**
     * Callback when a Reser got clicked
     */
    onResetClick: () => void,
    /**
     * Disabled for good mesure
     */
    isDisabled:boolean
}

export const ProgressManipulation = (props: Props) => {
    const classes = useStyles();
    const { t } = useTranslation("main");

    return (
        <div className={classes.root}>
            <List component="nav" aria-label="main question-list" subheader={
                <ListSubheader component="div" id="question-list-subheader" disableSticky={true}>
                    {t("ProgressManipulation.header")}
                </ListSubheader>
            }>
                <ListItem button onClick={(_event) => props.onResetClick()} disabled={props.isDisabled}>
                    <ListItemIcon >
                        <HighlightOff />
                    </ListItemIcon>
                    <ListItemText primary={t("ProgressManipulation.header")} />
                </ListItem>
            </List>
        </div>
    );
}