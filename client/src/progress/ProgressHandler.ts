import { LearningFile } from "../learningFileHandling/LearningFile";
import { IQuestion } from "./IQuestion";
import { deleteSavedProgress, loadFromLocalStorage, saveToLocalStorage } from "./StorageHandler";

/**
 * Class Representing the Learning Progress for a LearningFile
 */
export class ProgressHandler{

    public baseFile: LearningFile;
    private onReadyHandler: (caller: ProgressHandler) => void;
    public questions: IQuestion[] = []

    /**
     * Instanciate the ProgressHandler
     * @param baseFile The LearningFile to Use the Data From
     * @param onReadyHandler if is not null, this gets executed when the streets are loaded. Circumvents dealing with promises
     */
    constructor(baseFile: LearningFile, onReadyHandler: (caller: ProgressHandler) => void) {
        this.baseFile = baseFile;
        this.onReadyHandler = onReadyHandler;
        this.loadFromFile().then(() =>
            this.loadState()
        ).then(() =>
            this.onReady()
        )
    }

    /**
     * Prepares the questions from the Base File
     */
    private async loadFromFile() {
        let streets = await this.baseFile.getStreets()
        //we don't want any reference
        this.questions = Object.assign([], streets).map((q: string) => {
            //lint wants me to do so
            let a: IQuestion = {
                street: q.trim(),
                answerdCorrect: false
            }
            return a
        })
    }

    /**
     * Loads state from storage if available
     */
    private loadState() {
        let state = loadFromLocalStorage(this.baseFile.fileName)
        if(state === undefined){
            return
        }
        //make sure we can handle modified files
        state.questions.forEach((question) => {
            let found = this.questions.find((entry: IQuestion) =>  entry.street === question.street)
            if (found !== undefined) {
                found.answerdCorrect = question.answerdCorrect
            }
        })

    }

    /**
     * Executes On Ready Handler
     */
    private onReady() {
        if (this.onReadyHandler !== null) {
            this.onReadyHandler(this)
        }
    }

    /**
     * Resets the progress -> set all to answerd false
     */
    public resetProgress() {
        deleteSavedProgress(this.baseFile.fileName);
        this.questions.forEach((question) => { question.answerdCorrect = false })        
    }

    /**
     * Get all Questions which have not bin answerd or answerd worng
     * @returns List of IQuestion
     */
    private getUnanswerdStreets(): IQuestion[] {
        return this.questions.filter((question: IQuestion) => {
            return !question.answerdCorrect
        })
    }

    /**
     * Gets a random Street which was not or wrong answerd.
     * !Does not automatically roll over!
     * @returns String representing the Street Name
     */
    public getNextStreet(): string {
        let openQuestions: IQuestion[] = this.getUnanswerdStreets()
        let i: number = Math.floor(Math.random() * openQuestions.length) - 1
        if (i < 0) { i = 0 }
        return openQuestions[i].street
    }

    /**
     * Use to set the answer
     * @param street Name of the Street, usually obtained via getNextStreet()
     * @param isCorrect True if answer was correct
     */
    public processAnswer(street: string, isCorrect: boolean): void {
        if (isCorrect) {
            let q: IQuestion | undefined = this.questions.find((entry: IQuestion) => entry.street === street);
            if (q !== undefined) {
                q.answerdCorrect = true
            }
        }
        saveToLocalStorage({
            baseFileName: this.baseFile.fileName,
            questions: this.questions
        })
    }

    /**
     * Indicates if there are anymore streets to answer
     * @returns true if there are streets that are not or wrong answerd
     */
    public hasNextStreet(): boolean {
        return this.getUnanswerdStreets().length !== 0;
    }

    /**
     * Get All Questions
     * @returns List of IQuestion with answering State
     */
    public getStreets(): IQuestion[] {
        return this.questions;
    }
}