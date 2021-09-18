import { List, ListItem, ListItemIcon, ListItemText, createStyles, makeStyles, Theme, ListSubheader } from "@material-ui/core";
import { Description } from '@material-ui/icons';
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { LearningFile } from "./LearningFile";

/**
 * Internal interface to populate the child elements
 */
interface FileListItemProps {
    fileTitle: string,
    fileName: string,
    onClick: (fileTitle: string) => void,
    isDisabled: boolean,
}

/**
 * List entry for a Learning File
 * @param props FileListItemProps
 * @returns a List element representing a LearningFile
 */
const FileListItem = (props: FileListItemProps) => {
    return (
        <ListItem button onClick={() => props.onClick(props.fileName)} disabled={props.isDisabled} key={props.fileName}>
            <ListItemIcon >
                <Description />
            </ListItemIcon>
            <ListItemText primary={props.fileTitle} />
        </ListItem>
    )
}

/**
 * FileSelector Props Interface
 */
interface FileSelectorProps {
    /**
     * Files to display
     */
    files: LearningFile[],
    /**
     * Fires when the a file gets selected
     */
    onChanged: (selectedFile: LearningFile) => void,
}

/**
 * Displays a List of all Learning Files Specified in the props
 * @param props FileSelectorProps Interface
 * @returns A list displaying the LearningFiles
 */
export const FileSelector = (props: FileSelectorProps) => {
    const classes = useStyles();
    const [isDisabled, setDisabled] = useState<boolean>(false)
    const { t } = useTranslation("main");
    

    /**
     * Relays The element to the Handler
     * @param fileName selected fileName
     */
    const onClickedHandler = (fileName: string) => {
        props.files.forEach(element => {
            if (element.fileName === fileName) {
                props.onChanged(element);
            }
        });
        setDisabled(true);
    }

    return (
        <div className={classes.root}>
            <List component="nav" aria-label="main file-list" subheader={
                <ListSubheader component="div" id="file-list-subheader" disableSticky={true}>
                    {t("FileSelector.header")}
                </ListSubheader>
            }>
                {
                    props.files.map((file: LearningFile) => (
                        <FileListItem fileTitle={file.title} fileName={file.fileName} key={file.title} onClick={onClickedHandler} isDisabled={isDisabled} />
                    ))
                }
            </List>
        </div>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
    }),
);