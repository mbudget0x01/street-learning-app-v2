import { ILearningFile } from "./ILearningFile";
import { loadStreets } from "./FileHandler";

export class LearningFile implements ILearningFile {
    fileName: string;
    title: string;
    zipCode: string;
    city: string;
    countryCode: string;
    private streets: string[] =["abc"];
    //arrays can't be null and I cant be sure nonempty so...
    private streetsLoaded: boolean = false;

    
    public async getStreets() : Promise<string[]> {
        if(this.streetsLoaded){
            return this.streets;
        }
        //change here once loader is programmed
        this.streets = await loadStreets(this.fileName)
        this.streetsLoaded = true;
        return this.streets;
    }
    
    constructor(intrfce:ILearningFile){
        //is this a proper way? 0.o
        this.fileName = intrfce.fileName;
        this.title = intrfce.title;
        this.zipCode = intrfce.zipCode;
        this.city = intrfce.city;
        this.countryCode = intrfce.countryCode;
    }
    
    
    
    


}