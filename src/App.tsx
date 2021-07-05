import { createMuiTheme, Theme } from '@material-ui/core';
import { AppBar, CssBaseline, makeStyles, ThemeProvider, Toolbar, Typography } from '@material-ui/core';
import { useState } from 'react';
import { FileSelector } from './learning/FileSelector';
import { Map } from './map/Map'
import { ThemeSwitch, ThemeType } from './theme';
import './App.css'
import { loadFiles } from './learning/FileHandler'
import { LearningFile } from './learning/LearningFile';



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

  const testhandleclick = (t: LearningFile) => {
    console.log(t);
    console.log(t.getStreets().then((streets: string[]) => streets[0]));
  }

  const classes = useStyles()

  const [themeType, setThemeType] = useState<ThemeType>('light')


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
            <FileSelector files={loadFiles()} onChanged={testhandleclick} />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
