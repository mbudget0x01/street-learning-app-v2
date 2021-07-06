import { createMuiTheme, Theme } from '@material-ui/core';
import { AppBar, CssBaseline, makeStyles, ThemeProvider, Toolbar, Typography } from '@material-ui/core';
import { useState } from 'react';
import { FileSelector } from './fileHandling/FileSelector';
import { Map } from './map/Map'
import { ThemeSwitch, ThemeType } from './theme';
import './App.css'
import { loadFiles } from './fileHandling/FileHandler'
import { LearningFile } from './fileHandling/LearningFile';
import { AdvanceQuestionButton } from './ui/AdvanceQuestionButton';
import { ProgressHandler } from './progress/ProgressHandler';
import { QuestionDisplay } from './ui/QuestionDisplay';
import {version} from '../package.json'


const useStyles = makeStyles((theme: Theme) => ({
  toolbar: {
    ...theme.mixins.toolbar,
    display: 'flex',
    justifyItems: 'end',
    flexGrow: 1,
  },
  main: {
    offset: theme.mixins.toolbar.height?.valueOf,
    display: 'grid',
    height: '100vh',
    width: '100%',
    gridTemplateColumns: '1fr',
    justifyItems: 'center',
    overflow: 'auto',
  },
  title: {
    flexGrow: 1,
    justifySelf: 'start',
  },
  mainColumn: {
    width: '100%',
    gridColumn: 1,
  },
  asideColumn: {
    width: '100%',
    gridColumn: 2,
  },
  responsiveCard:{
    [theme.breakpoints.up('sm')]: {
      position: 'fixed !important',
      bottom: '0px',
      zIndex: 1002,
      width: '100vw'
    },
  }
}))

function App() {

  const hooseFileClickHandler = (file: LearningFile) => {
    setProgressHandler(new ProgressHandler(file, afterProgressHandlerLoadEventHandler))
  }

  const buttonDisplayClickHandler = () => {
    if(activeQuestion === undefined){
      return
    }
    setActiveQuery(activeQuestion)
  }

  const afterProgressHandlerLoadEventHandler = () => {
    setGameIsReady(true);
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
  const classes = useStyles()

  const [themeType, setThemeType] = useState<ThemeType>('light')
  const [gameIsReady, setGameIsReady] = useState<boolean>(false)
  const [progressHandler, setProgressHandler] = useState<ProgressHandler | null>(null)
  const [activeQuestion, setActiveQuestion] = useState<string | undefined>(undefined)
  const [activeQuery, setActiveQuery] = useState<string>("")


  const theme = createMuiTheme({
    palette: {
      type: themeType,
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <AppBar>
          <Toolbar className={classes.toolbar}>
            <Typography variant="h6" className={classes.title}>Street Learning App V2</Typography>
            <Typography variant="subtitle1" className={classes.title}>{"Version " + version}</Typography>
            <ThemeSwitch themeType={themeType} onThemeChange={setThemeType} />
          </Toolbar>
        </AppBar>
        <div className={classes.responsiveCard}>
          <QuestionDisplay activeQuestion={activeQuestion} isDisabled={!gameIsReady} onCheckCklickHandler={buttonDisplayClickHandler}/>
        </div>
        <div className={classes.main}>
          <div className={classes.mainColumn}>
            <Map uiMode={themeType} query={activeQuery} />
          </div>
          <div className={classes.asideColumn}>
            <FileSelector files={loadFiles()} onChanged={hooseFileClickHandler} />
            <AdvanceQuestionButton isDisabled={!gameIsReady} onClickHandler={buttonAdvanceClickHandler} />
            <Typography variant="caption">{"Version " + version}</Typography>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
