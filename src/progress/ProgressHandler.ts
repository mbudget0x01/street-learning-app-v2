import { LearningFile } from "../fileHandling/LearningFile";

export class ProgressHandler {

    private baseFile: LearningFile;
    private missingProgress: string[] = [];
    private onReadyHandler:() => void;


    constructor(baseFile: LearningFile, onReadyHandler:() => void) {
        this.baseFile = baseFile;
        this.resetProgress();
        this.onReadyHandler = onReadyHandler;
    }

    public resetProgress() {
        this.baseFile.getStreets().then((streets: string[]) =>{
            this.missingProgress = Object.assign([], streets)
            if(this.onReadyHandler !== null){
                this.onReadyHandler()
            }
        }
        )
    }

    public getNextStreet(): string {
        let i:number =  Math.floor(Math.random() * this.missingProgress.length) -1
        if(i < 0){i=0}     
        return this.missingProgress[i].trim()
    }

    public processAnswer(street: string, isCorrect: boolean): void {
        if (isCorrect) {
            this.missingProgress = this.missingProgress.filter((entry: string) => entry.trim() !== street.trim());
            this.onReadyHandler();
        }
    }

    public hasNextStreet():boolean{
        return this.missingProgress.length !== 0;
    }
}