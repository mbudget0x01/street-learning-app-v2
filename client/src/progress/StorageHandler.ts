import {IQuestion } from ".";

/**
 * Utility function to generate keys
 * @param baseFileName name of the base file (fileName not display Name)
 * @returns key belonging to this file 
 */
function getFileStateKey(baseFileName:string):string {
    return `progress.${baseFileName}.state`
}

/**
 * Saves state to local storage
 * @param state see IProgressState
 */
export function saveToLocalStorage(state:IProgressState){
    let payload:string = JSON.stringify(state);
    localStorage.setItem(getFileStateKey(state.baseFileName), payload)
}

/**
 * Loads the state from the local storage 
 * @param baseFileName name of the file in usage
 * @returns the last saved state
 */
export function loadFromLocalStorage(baseFileName:string):IProgressState | undefined{
    let payload:string | null = localStorage.getItem(getFileStateKey(baseFileName));
    if(payload === null){
        return undefined;
    }
    return JSON.parse(payload);
}

/**
 * Deletes a save from local storage
 * @param baseFileName Name of the base file
 */
export function deleteSavedProgress(baseFileName:string) {
    localStorage.removeItem(getFileStateKey(baseFileName))
}

/**
 * Interface used to save Progress to disk
 */
 export interface IProgressState{
    baseFileName: string,
    questions:IQuestion[]
}