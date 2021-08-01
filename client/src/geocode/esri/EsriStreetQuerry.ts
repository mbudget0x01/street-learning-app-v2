import { LatLng } from "leaflet";
import { LearningFile } from "../../learningFileHandling";
import { GeocodeError } from "../GeocodeError";
import {IDrawableStreet} from "../IDrawableStreet";
import { fetchFromServer } from "./EsriHelper";
import { EsriCandidate, EsriResponse } from "./esriResponse";

/**
 * Class representing a Street Query to the esri Provider
 */
export class EsriStreetQuery {
    private location: LatLng | undefined
    private streetName: string;
    private executed: boolean = false;
    private learningFile:LearningFile;

    /**
     * 
     * @param streetName The Name of the Street to query
     * @param querySuffix The esri query suffix
     */
    constructor(streetName: string, learningFile:LearningFile) {
        this.streetName = streetName;
        this.learningFile = learningFile
    }
    /**
     * Executes the query
     * @returns The approximate Location
     */
    public async execute() {
        if(this.executed){
            throw new GeocodeError("Multiple Request, don't spam the API", 'undefined')
        }

        this.executed = true;
        let response: EsriResponse
        //let response: SearchResult<any>
        let result:EsriCandidate | undefined
        try {
            response = await fetchFromServer(this.learningFile,this.streetName);
            console.log(response);
        
            result = response.candidates.pop()
            if (!result) {
                throw new GeocodeError("Street Name is unknown to the ESRI API.", 'NotResolvable')
            }    
            
            console.log(result);
            
        } catch (err) {
            throw new GeocodeError("ESRI Client API request failed.", 'NetworkFailure')
        }
        this.location = new LatLng(result.location.y, result.location.x)
        return this.location
    }

    /**
     * Indicates if the location is geocoded
     * @returns true if ready
     */
    public dataIsReady(): boolean {
        return this.location !== undefined;
    }

    /**
     * Getter for LatLng of location
     * @returns The location if present or undefined
     */
    public getLocation(){
        return this.location;
    }

    /**
     * Get the Drawable street interface
     * @returns Returns a drawable street Object, be aware polylines are non available
     */
    public getDrawableStreet():IDrawableStreet | undefined{
        if(this.location === undefined){return undefined}
        return {name:this.streetName, center:this.location,pathOption:{},polyLines:undefined}
    }
}