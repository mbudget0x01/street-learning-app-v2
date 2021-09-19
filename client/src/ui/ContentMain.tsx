import { makeStyles, Theme, createStyles } from "@material-ui/core"
import { LatLng, LatLngExpression } from "leaflet"
import { IDrawableStreet } from "../geocode"
import { Map } from "../map"
import { ThemeType } from "../theme"
import { ContentMainDialogFactory, DialogType } from "./ContentMainDialogeFactory"
import { QuestionDisplay } from "./QuestionDisplay"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        map: {
            height: '80vh'
        },
    }),
);


interface Props {
    /**
     * Indicates if controls are enabled
     */
    isDisabled: boolean,
    /**
     * Inicates if a manual answer is pending -> some controls disabled
     */
    manualAnswerIsPending: boolean,
    /**
     * The street to display at this moment
     */
    displayedStreet: IDrawableStreet | undefined,
    /**
     * The active question
     */
    activeQuestion: string | undefined,
    /**
     * The initial coordinates to zoom the map to at first render
     */
    initialCoordinates: LatLngExpression,
    /**
     * The theme Type to display a dark or light map
     */
    uiMode: ThemeType,
    /**
     * The Dialoge Type to Display
     */
    dialogType: DialogType,
    /**
     * If the dialog is open
     */
    dialogIsOpen: boolean,
    /**
     * Last error description
     */
    lastError: string,
    /**
     * last answer was correct
     */
    lastAnswerCorrect: boolean
    /**
     * On Dialog close Click
     */
    onDialogCloseClick: (isTrue: boolean | undefined) => void,
    /**
     * When the marker loaction is updated
     */
    onGuessLocationUpdate: (position: LatLng) => void,
    /**
     * User input to check the answer
     */
    onButtonCheckClickHandler: () => void,
    /**
     * User input to display the manual answer dialog requiers manualAnswerIsPending = True
     */
    onDisplayManualAnswerClickHandler: () => void
}

/**
 * Main Game Content
 * @param props Props
 * @returns JSX.Element
 */
export const ContentMain = (props: Props) => {

    const classes = useStyles();

    return (
        <div id="main-content-game">
            <div>
                <QuestionDisplay
                    activeQuestion={props.activeQuestion}
                    isDisabled={props.isDisabled}
                    onCheckCklickHandler={props.onButtonCheckClickHandler}
                    onDisplayManualAnswerClickHandler={props.onDisplayManualAnswerClickHandler}
                    manualAnswerPending={props.manualAnswerIsPending}
                />
            </div>
            <div id="map-wrapper" className={classes.map}>
                <Map
                    uiMode={props.uiMode}
                    onGuessLocationUpdate={props.onGuessLocationUpdate}
                    initialCoordinates={props.initialCoordinates}
                    displayedStreet={props.displayedStreet}
                    activeQuestion={props.activeQuestion}
                />
            </div>
            <ContentMainDialogFactory
                dialogType={props.dialogType}
                isOpen={props.dialogIsOpen}
                lastAnswerCorrect={props.lastAnswerCorrect}
                lastError={props.lastError}
                onDialogCloseClick={props.onDialogCloseClick}
                nextQuestion={props.activeQuestion}
            />
        </div>
    )
}