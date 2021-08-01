import { ILearningFile } from "./ILearningFile";
import { fetchStreets } from "./FileHandler";
/**
 * Class representing a Learning File and it's corresponding street file
 */
export class LearningFile implements ILearningFile {
    fileName: string;
    title: string;
    zipCode: string;
    city: string;
    countryCode: string;
    overpassAreaId: string;
    startCoordinates: [number, number] = [0.0, 0.0];
    private streets: string[] =["abc"];
    //arrays can't be null and I cant be sure nonempty so...
    private streetsLoaded: boolean = false;

    /**
     * Load the streets File specified
     * @returns The Promise from the Fetch containing the a List of SreetNames
     */
    public async getStreets() : Promise<string[]> {
        if(this.streetsLoaded){
            return this.streets;
        }
        //change here once loader is programmed
        this.streets = await fetchStreets(this.fileName)
        this.streetsLoaded = true;
        return this.streets;
    }
    
    /**
     * Instanciate from ILearningFile Interface
     * @param intrfce ILearning File to instanciate from
     */
    constructor(intrfce:ILearningFile){
        //is this a proper way? 0.o
        this.fileName = intrfce.fileName;
        this.title = intrfce.title;
        this.zipCode = intrfce.zipCode;
        this.city = intrfce.city;
        this.countryCode = intrfce.countryCode;
        this.overpassAreaId = intrfce.overpassAreaId;
        this.startCoordinates = intrfce.startCoordinates;
    }
    
    
    
    
    


}