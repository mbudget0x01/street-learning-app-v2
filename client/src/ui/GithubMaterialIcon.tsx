import { Icon } from "@material-ui/core"
import { GitHubIcon } from "./GithubIcon"

/**
 * Apstratction to create a GitHub Icon compatable with material ui
 * @returns a Material UI compatable Guthub Icon
 */
export const GitHubMaterialIcon = () => {
    return <Icon><GitHubIcon/></Icon>
}