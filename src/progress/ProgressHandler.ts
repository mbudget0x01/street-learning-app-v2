import { LearningFile } from "../learningFileHandling/LearningFile";
import { IQuestion } from "./IQuestion";

/**
 * Class Representing the Learning Progress for a LearningFile
 */
export class ProgressHandler {

    private baseFile: LearningFile;
    private onReadyHandler:(caller:ProgressHandler) => void;
    public allQuestions:IQuestion[] = []

    /**
     * Instanciate the ProgressHandler
     * @param baseFile The LearningFile to Use the Data From
     * @param onReadyHandler if is not null, this gets executed when the streets are loaded. Circumvents dealing with promises
     */
    constructor(baseFile: LearningFile, onReadyHandler:(caller:ProgressHandler) => void) {
        this.baseFile = baseFile;
        this.loadQuestions();
        this.onReadyHandler = onReadyHandler;
    }

    /**
     * Prepares the questions from the Base File
     */
    private loadQuestions() {
        this.baseFile.getStreets().then((streets: string[]) =>{
            //we don't want any reference
            this.allQuestions = Object.assign([], streets).map((q:string) => {
                //lint wants me to do so
                let a:IQuestion = {
                    street: q.trim(),
                    answerdCorrect: false
                }
                return a
            })
            
            if(this.onReadyHandler !== null){
                this.onReadyHandler(this)
            }
        }
        )
    }

    /**
     * Resets the progress -> set all to answerd false
     */
    public resetProgress(){
        this.allQuestions.forEach((question) =>{question.answerdCorrect = false})
    }

    /**
     * Get all Questions which have not bin answerd or answerd worng
     * @returns List of IQuestion
     */
    private getUnanswerdStreets():IQuestion[]{
        return this.allQuestions.filter((question:IQuestion) => {
            return !question.answerdCorrect
        })
    }

    /**
     * Gets a random Street which was not or wrong answerd.
     * !Does not automatically roll over!
     * @returns String representing the Street Name
     */
    public getNextStreet(): string {
        let openQuestions:IQuestion[] = this.getUnanswerdStreets()
        let i:number =  Math.floor(Math.random() * openQuestions.length) -1
        if(i < 0){i=0}     
        return openQuestions[i].street
    }

    /**
     * Use to set the answer
     * @param street Name of the Street, usually obtained via getNextStreet()
     * @param isCorrect True if answer was correct
     */
    public processAnswer(street: string, isCorrect: boolean): void {
        if (isCorrect) {
            let q:IQuestion | undefined = this.allQuestions.find((entry: IQuestion) => entry.street === street);
            if(q !== undefined){
                q.answerdCorrect = true
            }
        }
    }

    /**
     * Indicates if there are anymore streets to answer
     * @returns true if there are streets that are not or wrong answerd
     */
    public hasNextStreet():boolean{
        return this.getUnanswerdStreets().length !== 0;
    }

    /**
     * Get All Questions
     * @returns List of IQuestion with answering State
     */
    public getStreets():IQuestion[]{
        return this.allQuestions;
    }
}