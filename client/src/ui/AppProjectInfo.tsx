import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core"
import CodeIcon from '@material-ui/icons/Code';
import { version } from '../../package.json'
import { GitHubMaterialIcon } from "."
import { useTranslation } from "react-i18next";

/**
 * A List containing all relevant App Informations e.g. put in drawer
 * @returns JSX.Element
 */
export const AppProjectInfo = () => {

  const { t } = useTranslation("general");

  return (
    <List>
      <ListItem button component="a" href="https://github.com/mbudget0x01/street-learning-app-v2" target="blank" key={"repo"}>
        <ListItemIcon><GitHubMaterialIcon /></ListItemIcon>
        <ListItemText primary={t("AppProjectInfo.VisitGithub")} />
      </ListItem>
      <ListItem key={"version"}>
        <ListItemIcon><CodeIcon /></ListItemIcon>
        <ListItemText primary={t("AppProjectInfo.Version") + " " + version} />
      </ListItem>
    </List>
  )
}