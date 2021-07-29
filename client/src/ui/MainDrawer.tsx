import { ThemeProvider, CssBaseline, AppBar, Toolbar, IconButton, Hidden, Typography, Drawer, Divider, createMuiTheme, createStyles, makeStyles, Theme } from "@material-ui/core"
import { AppProjectInfo } from "."
import { ThemeSwitch, ThemeType } from "../theme"
import clsx from 'clsx'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'


const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        appBar: {
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        hide: {
            display: 'none',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
            justifyContent: 'flex-end',
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: -drawerWidth,
            //hopefully makes with 100% on smaller devices
            width: "100%"
        },
        contentShift: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        },
        map: {
            height: '80vh'
        },
        toolbar: {
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center',
        }
    }),
);


interface Props {
    /**
     * The content of the side drawer
     */
    drawerContent: JSX.Element[]
    /**
     * The Main Content
     */
    mainContent: JSX.Element
    /**
     * Indicating if the drawer is open
     */
    drawerIsOpen: boolean
    /**
     * User Input to open the drawer
     */
    handleDrawerOpen: () => void
    /**
     * User Input to close the drawer
     */
    handleDrawerClose: () => void
    /**
     * The actual theme Type usually a state
     */
    themeType: ThemeType
    /**
     * On Theme changed see ThemeSwitch.tsx
     */
    onThemeChange: (themeType: ThemeType) => void
}

var id = 0;
function nextID():number{
    id++
    return id;
}

/**
 * Returns the Main App Drawer capsulated from the App
 * @param props Props
 * @returns The App Drawer
 */
export const MainDrawer = (props: Props) => {

    const classes = useStyles();

    const theme = createMuiTheme({
        palette: {
            type: props.themeType,
        },
    })

    return (
        <div className={classes.root}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: props.drawerIsOpen,
                    })}
                >
                    <Toolbar >

                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={props.handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, props.drawerIsOpen && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <div className={classes.toolbar}>
                            <div>
                                <Hidden smUp><Typography variant="h6" noWrap>
                                    SLA V2
                                </Typography>
                                </Hidden>
                                <Hidden xsDown>
                                    <Typography variant="h6" noWrap>
                                        Street Learning App V2
                                    </Typography>
                                </Hidden>
                            </div>
                            <div>
                                <ThemeSwitch themeType={props.themeType} onThemeChange={props.onThemeChange} />
                            </div>
                        </div>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={props.drawerIsOpen}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={props.handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <AppProjectInfo />
                    {props.drawerContent.map((element) => {
                        return (
                            <div key={nextID().toString()}>
                                <Divider />
                                {element}
                            </div>
                        )
                    })}
                </Drawer>
                <main
                    className={clsx(classes.content, {
                        [classes.contentShift]: props.drawerIsOpen,
                    })}
                >
                    <div className={classes.drawerHeader} />

                    {props.mainContent}
                </main>
            </ThemeProvider>
        </div>
    )
}