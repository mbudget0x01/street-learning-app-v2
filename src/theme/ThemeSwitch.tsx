import DarkThemeIcon from '@material-ui/icons/Brightness2'
import LightThemeIcon from '@material-ui/icons/WbSunny'
import { Switch } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { ThemeType } from './model'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    margin: 4,
  },
})

interface Props {
  themeType: ThemeType
  onThemeChange: (themeType: ThemeType) => void
}
/**
 * Theme switch to switch light and dark theme
 * @param param0 
 * @returns 
 */
export const ThemeSwitch = ({ themeType, onThemeChange }: Props) => {
  const classes = useStyles()
  const isDarkTheme = themeType === 'dark'
  const handleChange = () => onThemeChange(isDarkTheme ? 'light' : 'dark')
  return (
    <div className={classes.root}>
      <LightThemeIcon className={classes.icon} />
      <Switch checked={isDarkTheme} onChange={handleChange} color={'default'} />
      <DarkThemeIcon className={classes.icon} />
    </div>
  )
}
