import { LearningFile } from "../fileHandling/LearningFile";
import { IQuestion } from "./IQuestion";

export class ProgressHandler {

    private baseFile: LearningFile;
    //private missingProgress: string[] = [];
    private onReadyHandler:(caller:ProgressHandler) => void;
    public allQuestions:IQuestion[] = []

    constructor(baseFile: LearningFile, onReadyHandler:(caller:ProgressHandler) => void) {
        this.baseFile = baseFile;
        this.resetProgress();
        this.onReadyHandler = onReadyHandler;
    }

    public resetProgress() {
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

    public getNextStreet(): string {
        let openQuestions:IQuestion[] = this.allQuestions.filter((question:IQuestion) => {
            return !question.answerdCorrect
        })
        let i:number =  Math.floor(Math.random() * openQuestions.length) -1
        if(i < 0){i=0}     
        return openQuestions[i].street
    }

    public processAnswer(street: string, isCorrect: boolean): void {
        if (isCorrect) {
            let q:IQuestion | undefined = this.allQuestions.find((entry: IQuestion) => entry.street === street);
            if(q !== undefined){
                q.answerdCorrect = true
            }
        }
    }

    public hasNextStreet():boolean{
        return this.allQuestions.length !== 0;
    }

    public getStreets():IQuestion[]{
        return this.allQuestions;
    }
}