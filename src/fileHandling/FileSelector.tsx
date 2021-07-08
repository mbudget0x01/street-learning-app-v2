import { List, ListItem, ListItemIcon, ListItemText, createStyles, makeStyles, Theme, ListSubheader } from "@material-ui/core";
import { Description } from '@material-ui/icons';
import { useState } from "react";
import { LearningFile } from "./LearningFile";


interface FileListItemProps {
    fileTitle: string,
    onClick: (fileTitle: string) => void,
    isDisabled: boolean,
}

const FileListItem = (props: FileListItemProps) => {
    return (
        <ListItem button onClick={(event) => props.onClick(props.fileTitle)} disabled={props.isDisabled}>
            <ListItemIcon >
                <Description />
            </ListItemIcon>
            <ListItemText primary={props.fileTitle} />
        </ListItem>
    )
}

interface FileSelectorProps {
    files: Promise<LearningFile[]>,
    onChanged: (selectedFile: LearningFile) => void,
}

export const FileSelector = (props: FileSelectorProps) => {
    const classes = useStyles();
    const [values, setValues] = useState<LearningFile[]>([]);
    const [isDisabled, setDisabled] = useState<boolean>(false)
    props.files.then((files: LearningFile[]) => setValues(files));

    const onClickedHandler = (fileName: string) => {
        values.forEach(element => {
            if (element.title === fileName) {
                props.onChanged(element);
            }
        });
        setDisabled(true);
    }

    return (
        <div className={classes.root}>
            <List component="nav" aria-label="main file-list" subheader={
                <ListSubheader component="div" id="file-list-subheader" disableSticky={true}>
                    Available Files
                </ListSubheader>
            }>
                {
                    values.map((file: LearningFile) => (
                        <FileListItem fileTitle={file.title} key={file.title} onClick={onClickedHandler} isDisabled={isDisabled} />
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