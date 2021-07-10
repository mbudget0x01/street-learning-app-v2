import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, Theme, createStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { ThemeSwitch, ThemeType } from './theme';
import { Map } from './map/Map'
import { FileSelector } from './fileHandling/FileSelector';
import { loadFiles } from './fileHandling/FileHandler'
import { ProgressHandler } from './progress/ProgressHandler';
import { LearningFile } from './fileHandling/LearningFile';
import { version } from '../package.json'
import CodeIcon from '@material-ui/icons/Code';
import { QuestionDisplay } from './ui/QuestionDisplay';
import { GitHubMaterialIcon } from './ui/GithubMaterialIcon';
import { ProgressList } from './progress/ProgressList';
import { IQuestion } from './progress/IQuestion';
import { LatLng } from 'leaflet';
import { isSameStreetOverpass } from './geocode/GeocodeChecker';
import { ErrorDialog } from './ui/ErrorDialog';
import { QuestionFeedbackDialog } from './ui/QuestionFeedbackDialog';
import { GeneralDescriptionDialog } from './ui/GeneralDescriptionDialog';
import { GeocodeError } from './geocode/GeocodeError';

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
    }
  }),
);

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  //const theme = useTheme();
  const [open, setOpen] = React.useState<boolean>(true);
  const [themeType, setThemeType] = useState<ThemeType>('light')
  const [gameIsReady, setGameIsReady] = useState<boolean>(false)
  const [progressHandler, setProgressHandler] = useState<ProgressHandler | null>(null)
  const [streets, setStreets] = useState<IQuestion[]>([])
  const [activeQuestion, setActiveQuestion] = useState<string | undefined>(undefined)
  const [activeQuery, setActiveQuery] = useState<string>("")
  const [lastGuessedPosition, setLastGuessedPosition] = useState<LatLng>(new LatLng(0, 0))
  const [errorDialogOpen, setErrorDialogOpen] = useState<boolean>(false)
  const [answerDialogOpen, setAnswerDialogOpen] = useState<boolean>(false)
  const [answerWasCorrect, setAnswerWasCorrect] = useState<boolean>(false)
  const [errorDialogText, setErrorDialogText] = useState<string>("")
  const [generalDescriptionOpen, setGeneralDescriptionOpen] = useState<boolean>(true)
  const [startCoordinates, setStartCoordinates] = useState<[number,number]>([48.858093, 2.294694])


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const chooseFileClickHandler = (file: LearningFile) => {
    handleDrawerClose();
    setProgressHandler(new ProgressHandler(file, afterProgressHandlerLoadEventHandler));
    setStartCoordinates(file.startCoordinates);
  }

  const afterProgressHandlerLoadEventHandler = (instance: ProgressHandler) => {
    setGameIsReady(true);
    setStreets(instance.allQuestions)
    //we can set it already via instance
    setActiveQuestion(instance.getNextStreet())
  }

  const buttonAdvanceClickHandler = () => {
    if (progressHandler == null) {
      return
    }
    if (!progressHandler.hasNextStreet()) {
      console.log("empty");
    }
    setActiveQuestion(progressHandler.getNextStreet())
  }

  const buttonCheckClickHandler = () => {
    if (activeQuestion === undefined) {
      return
    }
    setActiveQuery(activeQuestion)
    isSameStreetOverpass(lastGuessedPosition, activeQuestion).then((isTrue: boolean) => {
      progressHandler?.processAnswer(activeQuestion, isTrue);
      setAnswerWasCorrect(isTrue)
      setAnswerDialogOpen(true)
    }).catch((error: GeocodeError) => {
      setErrorDialogText(`${error.geocodeErrorCause}. ${error.message}`)
      setErrorDialogOpen(true)
    }).finally(() => {
      if (progressHandler !== null) {
        //seems pointless but forces rerender thanks react 
        setStreets(progressHandler.getStreets().concat([]))
      }
    }
    )
  }

  const onQuestionClickHandler = (question: IQuestion) => {
    setActiveQuery(question.street)
  }

  const theme = createMuiTheme({
    palette: {
      type: themeType,
    },
  })

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Street Learning App V2
            </Typography>
            <ThemeSwitch themeType={themeType} onThemeChange={setThemeType} />
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem button component="a" href="https://github.com/mbudget0x01/street-learning-app-v2" target="blank">
              <ListItemIcon><GitHubMaterialIcon /></ListItemIcon>
              <ListItemText primary={"Visit Project"} />
            </ListItem>
            <ListItem>
              <ListItemIcon><CodeIcon /></ListItemIcon>
              <ListItemText primary={"Version " + version} />
            </ListItem>
          </List>
          <Divider />
          <FileSelector files={loadFiles()} onChanged={chooseFileClickHandler} />
          <Divider />
          <ProgressList questions={streets} onQuestionClick={onQuestionClickHandler} />
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          <div>
            <QuestionDisplay
              activeQuestion={activeQuestion}
              isDisabled={!gameIsReady}
              onCheckCklickHandler={buttonCheckClickHandler}
              onAdvanceClickHandler={buttonAdvanceClickHandler}
            />
          </div>
          <div id="map-wrapper" className={classes.map}>
            <Map uiMode={themeType}
             query={activeQuery}
             onGuessLocationUpdate={setLastGuessedPosition}
             question={activeQuestion}
             initialCoordinates={startCoordinates}
             onGeocodeError={(error:GeocodeError)=> console.log(error)}
             />
          </div>          
          <QuestionFeedbackDialog buttonCloseClicked={() =>setAnswerDialogOpen(false)} isOpen={answerDialogOpen} wasCorrect={answerWasCorrect} />
          <ErrorDialog buttonCloseClicked={() =>setErrorDialogOpen(false)} isOpen={errorDialogOpen} errorFriendlyDescription={errorDialogText} />
          <GeneralDescriptionDialog buttonCloseClicked={() =>setGeneralDescriptionOpen(false)} isOpen={generalDescriptionOpen}  />
        </main>
      </ThemeProvider>
    </div>
  );
}