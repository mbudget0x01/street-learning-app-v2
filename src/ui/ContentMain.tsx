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
    isDisabled: boolean,
    manualAnswerIsPending: boolean,
    displayedStreet: IDrawableStreet | undefined,
    activeQuestion: string | undefined,
    initialCoordinates: LatLngExpression,
    uiMode: ThemeType,
    dialogType: DialogType,
    dialogIsOpen: boolean,
    lastError: string,
    lastAnswerCorrect: boolean
    onDialogCloseClick: (isTrue: boolean | undefined) => void,
    onGuessLocationUpdate: (position: LatLng) => void,
    onButtonCheckClickHandler: () => void,
    onDisplayManualAnswerClickHandler: () => void
}

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