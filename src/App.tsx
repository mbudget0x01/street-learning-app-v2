import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, Theme, createStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { ThemeSwitch, ThemeType } from './theme';
import { latLng, LatLng } from 'leaflet';
import { StreetGeocoder, isSameStreet, IDrawableStreet } from './geocode';
import { generateQuerySuffix } from './geocode/esri';
import { Hidden } from '@material-ui/core';
import { fetchLearningFiles, FileSelector, LearningFile } from './learningFileHandling';
import { ContentMain, AppProjectInfo, DisplayLoading, DialogType } from './ui';
import { IQuestion, ProgressHandler, ProgressList } from './progress';


//#region style
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

//#endregion

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const streetGeocoder = StreetGeocoder.getInstance();
  //const theme = useTheme();
  const [open, setOpen] = React.useState<boolean>(true);
  const [themeType, setThemeType] = useState<ThemeType>('light')
  const [gameIsReady, setGameIsReady] = useState<boolean>(false)
  const [progressHandler, setProgressHandler] = useState<ProgressHandler | null>(null)
  const [streets, setStreets] = useState<IQuestion[]>([])
  const [activeQuestion, setActiveQuestion] = useState<string | undefined>(undefined)
  const [lastGuessedPosition, setLastGuessedPosition] = useState<LatLng>(new LatLng(0, 0))
  const [answerWasCorrect, setAnswerWasCorrect] = useState<boolean>(false)
  const [errorDialogText, setErrorDialogText] = useState<string>("")
  const [manualAnswerPending, setManualAnswerPending] = useState<boolean>(false)
  const [startCoordinates, setStartCoordinates] = useState<[number, number]>([48.858093, 2.294694])
  //does this belong here?
  const [displayedStreet, setDisplayedStreet] = useState<IDrawableStreet>()
  const [overpassAreaId, setOverpassAreaId] = useState<string>()
  const [esriQuerySuffix, setEsriQuerySuffix] = useState<string>()

  //Dialog rebuild
  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(true)
  const [dialogType, setDialogType] = useState<DialogType>("generalDescription")
  const [appIsReady, setAppIsReady] = useState<boolean>(false)
  const [learningFiles, setLearningFiles] = useState<LearningFile[]>([])


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const setAnswer = (isCorrect: boolean, displayFeedbackDialog: boolean) => {
    if (activeQuestion !== undefined) {
      progressHandler?.processAnswer(activeQuestion, isCorrect);
    }
    setAnswerWasCorrect(isCorrect)
    if (progressHandler !== null && !progressHandler.hasNextStreet()) {
      setDialogType("resetProgress")
      setDialogIsOpen(true)
      return
    }
    if (displayFeedbackDialog) {
      setDialogIsOpen(true)
      setDialogType("questionFeedback")
    }

  }

  const chooseFileClickHandler = (file: LearningFile) => {
    handleDrawerClose();
    setOverpassAreaId(file.overpassAreaId)
    setEsriQuerySuffix(generateQuerySuffix(file))
    setProgressHandler(new ProgressHandler(file, afterProgressHandlerLoadEventHandler));
    setStartCoordinates(file.startCoordinates);
    setLastGuessedPosition(latLng(file.startCoordinates))
  }

  const afterProgressHandlerLoadEventHandler = (instance: ProgressHandler) => {
    setGameIsReady(true);
    setStreets(instance.allQuestions)
    //we can set it already via instance
    setActiveQuestion(instance.getNextStreet())
  }

  const buttonCheckClickHandler = async () => {
    if (activeQuestion === undefined) {
      return
    }
    let street: IDrawableStreet | undefined = await geocodeStreet(activeQuestion)
    setDisplayedStreet(street)
    if (street === undefined) {
      return
    }
    isSameStreet(lastGuessedPosition, street.center, activeQuestion).then((response: boolean | undefined) => {
      if (response === undefined) {
        displayManualAnswerDialog()
        return
      }
      setAnswer(response, true)
    }).finally(() => {
      if (progressHandler !== null && progressHandler.hasNextStreet()) {
        setActiveQuestion(progressHandler.getNextStreet())
      }
    }
    )
  }

  const displayManualAnswerDialog = () => {
    setManualAnswerPending(true)
    setDialogType("manualDecision")
    setDialogIsOpen(true)
  }


  const displayError = (errorText: string) => {
    setDialogType("error")
    setErrorDialogText(errorText)
    setDialogIsOpen(true)
  }

  /**
   * Geocodes the street using StreetGeocoder
   * @param streetName Name of the Street to display
   * @returns the geocoded street
   */
  const geocodeStreet = async (streetName: string): Promise<IDrawableStreet | undefined> => {
    if (!overpassAreaId || !esriQuerySuffix) {
      displayError("Can't geocode! Check descriptor.json.")
      return undefined
    }
    let displStrt: IDrawableStreet | undefined = undefined;

    //catch network issues
    try {
      displStrt = await streetGeocoder.geocodeStreet(streetName, overpassAreaId, esriQuerySuffix)
    } catch {
      displayError("There is an network issue. Could not reach the API(s)")
      return undefined
    }

    if (!displStrt) {
      displayError(`Unfortunatly the App was not able to resolve ${streetName}. The primary and secondary Geocoder are exhausted.`)
      return undefined
    }
    return displStrt
  }

  const onQuestionClickHandler = async (question: IQuestion) => {
    let street: IDrawableStreet | undefined = await geocodeStreet(question.street)
    setDisplayedStreet(street)
  }


  const onDialogClickHandler = (dialogResult: boolean | undefined) => {
    setDialogIsOpen(false)
    switch (dialogType) {
      case "resetProgress":
        if (progressHandler !== null) {
          progressHandler.resetProgress()
        }
        break
      case "manualDecision":
        if (dialogResult !== undefined) {
          setManualAnswerPending(false)
          setAnswer(dialogResult, false)
        }
    }

  }

  const theme = createMuiTheme({
    palette: {
      type: themeType,
    },
  })

  //if we need to load data first
  if (!appIsReady) {
    fetchLearningFiles().then((files: LearningFile[]) => {
      setLearningFiles(files)
      setAppIsReady(true)
    })
    //render after data is loaded
    return (
      <div className={classes.root}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <DisplayLoading />
        </ThemeProvider>
      </div>
    )
  }

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
          <Toolbar >

            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
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
                <ThemeSwitch themeType={themeType} onThemeChange={setThemeType} />
              </div>
            </div>
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
          <AppProjectInfo />
          <Divider />
          <FileSelector files={learningFiles} onChanged={chooseFileClickHandler} />
          <Divider />
          <ProgressList questions={streets} onQuestionClick={onQuestionClickHandler} />
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />

          <ContentMain
            activeQuestion={activeQuestion}
            isDisabled={!gameIsReady}
            onButtonCheckClickHandler={buttonCheckClickHandler}
            onDisplayManualAnswerClickHandler={() => displayManualAnswerDialog()}
            displayedStreet={displayedStreet}
            initialCoordinates={startCoordinates}
            manualAnswerIsPending={manualAnswerPending}
            onGuessLocationUpdate={setLastGuessedPosition}
            uiMode={themeType}
            dialogIsOpen={dialogIsOpen}
            dialogType={dialogType}
            lastAnswerCorrect={answerWasCorrect}
            lastError={errorDialogText}
            onDialogCloseClick={onDialogClickHandler}
          />
        </main>
      </ThemeProvider>
    </div>
  );
}