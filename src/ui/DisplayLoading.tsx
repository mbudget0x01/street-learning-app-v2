import { CircularProgress, createStyles, makeStyles, Theme, Typography } from "@material-ui/core"

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


export const DisplayLoading = () => {
    const classes = useStyles();

    return (
        <div className={classes.contentWrapper}>
            <CircularProgress size={'20%'} />
            <Typography >
                App is Loading. Please stand by...
            </Typography>
        </div>
    )
}