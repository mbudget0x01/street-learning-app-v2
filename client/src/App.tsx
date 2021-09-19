import { LatLng, latLng } from "leaflet";
import React, { useState } from "react";
import { isIE } from "react-device-detect";
import { IDrawableStreet, isSameStreet, StreetGeocoder } from "./geocode";
import { generateQuerySuffix } from "./geocode/esri";
import { fetchLearningFiles, FileSelector, LearningFile } from "./learningFileHandling";
import { IQuestion, ProgressHandler, ProgressList, ProgressManipulation } from "./progress";
import { ThemeType } from "./theme";
import { ContentMain, DialogType, DisplayLoading, MainDrawer, UnsupportedBrowserDialog } from "./ui";

/**
 * Main App Entry Point
 * @returns App
 */
export default function App() {

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
    const [errorDialogTextKey, setErrorDialogTextKey] = useState<string>("")
    const [manualAnswerPending, setManualAnswerPending] = useState<boolean>(false)
    const [startCoordinates, setStartCoordinates] = useState<[number, number]>([48.858093, 2.294694])
    //does this belong here?
    const [displayedStreet, setDisplayedStreet] = useState<IDrawableStreet>()
    const [overpassAreaId, setOverpassAreaId] = useState<string>()
    const [esriQuerySuffix, setEsriQuerySuffix] = useState<string>()

    //Dialog rebuild
    const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(true)
    const [unsupportedBrowserDialogOpen, setUnsupportedBrowserDialogOpen] = useState<boolean>(isIE)
    const [dialogType, setDialogType] = useState<DialogType>("generalDescription")
    const [appIsReady, setAppIsReady] = useState<boolean>(false)
    const [appIsInitializing, setAppIsInitializing] = useState<boolean>(false)
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
            setDialogType("questionFeedbackRandom")
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
        setStreets(instance.questions)
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
        setErrorDialogTextKey(errorText)
        setDialogIsOpen(true)
    }

    const displayForceReset = () => {
        setDialogType("resetProgressForce")
        setDialogIsOpen(true)
    }

    const displayNoCheating = () => {
        setDialogType("noExploit")
        setDialogIsOpen(true)
    }

    /**
     * Geocodes the street using StreetGeocoder
     * @param streetName Name of the Street to display
     * @returns the geocoded street
     */
    const geocodeStreet = async (streetName: string): Promise<IDrawableStreet | undefined> => {
        if (!overpassAreaId || !esriQuerySuffix) {
            displayError("ErrorDialog.error.invalidDescriptorJson")
            return undefined
        }
        let displStrt: IDrawableStreet | undefined = undefined;

        //catch network issues
        try {
            if (progressHandler) {
                displStrt = await streetGeocoder.geocodeStreet(streetName, progressHandler.baseFile)
            }
        } catch {
            displayError("ErrorDialog.error.apiNotReachable")
            return undefined
        }

        if (!displStrt) {
            displayError("ErrorDialog.error.apiStreetNotFound")
            return undefined
        }
        return displStrt
    }

    const onQuestionClickHandler = async (question: IQuestion) => {
        if (question.street === activeQuestion) {
            //no no no, no cheating ;-)
            displayNoCheating();
            return
        }
        let street: IDrawableStreet | undefined = await geocodeStreet(question.street)
        setDisplayedStreet(street)
    }


    const onDialogClickHandler = (dialogResult: boolean | undefined) => {
        setDialogIsOpen(false)
        switch (dialogType) {
            //diffrent dialog same result
            case "resetProgress":
            case "resetProgressForce":
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

    //if we need to load data first
    if (!appIsReady && !appIsInitializing) {
        setAppIsInitializing(true)
        fetchLearningFiles().then((files: LearningFile[]) => {
            setLearningFiles(files)
            setAppIsReady(true)
        })
    }
    // render loading screen
    if (!appIsReady || unsupportedBrowserDialogOpen) {
        return (

            <MainDrawer
                drawerContent={[]}
                mainContent={
                    <div>
                        <DisplayLoading />
                        <UnsupportedBrowserDialog
                            buttonCloseClicked={() => setUnsupportedBrowserDialogOpen(false)}
                            isOpen={unsupportedBrowserDialogOpen}
                        />
                    </div>
                }
                drawerIsOpen={false}
                handleDrawerClose={() => { }}
                handleDrawerOpen={() => { }}
                onThemeChange={setThemeType}
                themeType={themeType}
            />
        )
    }



    return (
        <MainDrawer
            drawerContent={
                [
                    <FileSelector files={learningFiles} onChanged={chooseFileClickHandler} />,
                    <ProgressManipulation onResetClick={displayForceReset} isDisabled={!gameIsReady} />,
                    <ProgressList questions={streets} onQuestionClick={onQuestionClickHandler} />
                ]
            }
            mainContent={
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
                    lastError={errorDialogTextKey}
                    onDialogCloseClick={onDialogClickHandler}
                />
            }
            drawerIsOpen={open}
            handleDrawerClose={handleDrawerClose}
            handleDrawerOpen={handleDrawerOpen}
            onThemeChange={setThemeType}
            themeType={themeType}
        />
    )
}