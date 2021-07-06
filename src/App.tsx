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
}))

function App() {

  const handleFileListClick = (file: LearningFile) => {
    setProgressHandler(new ProgressHandler(file, afterLoadEventHandler))
  }

  const afterLoadEventHandler = () => {
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
    console.log("active Question", activeQuestion);


  }
  const classes = useStyles()

  const [themeType, setThemeType] = useState<ThemeType>('light')
  const [gameIsReady, setGameIsReady] = useState<boolean>(false)
  const [progressHandler, setProgressHandler] = useState<ProgressHandler | null>(null)
  const [activeQuestion, setActiveQuestion] = useState<String | undefined>(undefined)


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
            <ThemeSwitch themeType={themeType} onThemeChange={setThemeType} />
          </Toolbar>
        </AppBar>
        <div className={classes.main}>
          <div className={classes.mainColumn}>
            <Map uiMode={themeType} />
          </div>
          <div className={classes.asideColumn}>
            <FileSelector files={loadFiles()} onChanged={handleFileListClick} />
            <AdvanceQuestionButton isDisabled={!gameIsReady} onClickHandler={buttonAdvanceClickHandler} />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
