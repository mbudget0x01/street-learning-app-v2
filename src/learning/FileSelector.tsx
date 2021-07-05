import { List, ListItem, ListItemIcon, ListItemText, createStyles, makeStyles, Theme } from "@material-ui/core";
import { Description } from '@material-ui/icons';


interface FileListItemProps {
    fileTitle: string,
    onClick: (fileTitle:string) => void,
}

const FileListItem = (props: FileListItemProps) => {
    return (
        <ListItem button onClick={(event) => props.onClick(props.fileTitle)}>
            <ListItemIcon >
                <Description />
            </ListItemIcon>
            <ListItemText primary={props.fileTitle} />
        </ListItem>
    )
}

interface FileSelectorProps {
    files: string[],
    onChanged: (fileTitle:string) => void,
    //handler
}

export const FileSelector = (props: FileSelectorProps) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <List component="nav" aria-label="main file-list">
                {
                    props.files.map((file: string) => (
                        <FileListItem fileTitle={file} key={file} onClick={props.onChanged} />
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