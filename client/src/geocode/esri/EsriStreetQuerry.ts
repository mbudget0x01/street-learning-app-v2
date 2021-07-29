import { LatLng } from "leaflet";
import { EsriProvider } from "leaflet-geosearch";
import { SearchResult } from "leaflet-geosearch/dist/providers/provider";
import { GeocodeError } from "../GeocodeError";
import {IDrawableStreet} from "../IDrawableStreet";

/**
 * Class representing a Street Query to the esri Provider
 */
export class EsriStreetQuery {
    private querySuffix: string;
    private provider: EsriProvider = new EsriProvider();
    private location: LatLng | undefined
    private streetName: string;
    private executed: boolean = false;

    /**
     * 
     * @param streetName The Name of the Street to query
     * @param querySuffix The esri query suffix
     */
    constructor(streetName: string, querySuffix: string) {
        this.streetName = streetName;
        this.querySuffix = querySuffix;
    }

    /**
     * Assembles the query string for the ersi api
     * @returns The query string for the esri provider
     */
    private getQueryString(): string {
        return `${this.streetName} ${this.querySuffix}`
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
        let response: SearchResult<any>[]
        let result
        try {
            response = await this.provider.search({ query: this.getQueryString() });
            result = response.pop();
        } catch (err) {
            throw new GeocodeError("ESRI Client API request failed.", 'NetworkFailure')
        }
        if (result === undefined) {
            throw new GeocodeError("Street Name is unknown to the ESRI API.", 'NotResolvable')
        }
        this.location = new LatLng(result.y, result.x)
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