//TODO: find a better name for this class

import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core"
import CodeIcon from '@material-ui/icons/Code';
import { version } from '../../package.json'
import { GitHubMaterialIcon } from "."

export const AppProjectInfo = () => {
    return (
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
    )
}