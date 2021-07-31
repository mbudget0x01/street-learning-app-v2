import { ICachedObject } from "../cache/cachedObject";

type CachedStreetApi = "overpass" | "esri"

export class CachedStreet implements ICachedObject{
    streetName: string;
    api: CachedStreetApi;
    fileName: string;
    data:string;
    redisKey:string = "";
    //30 days
    expirationTime: number= 60 * 60 * 24 * 30;

    constructor(streetName:string, fileName:string, api:CachedStreetApi){
        this.streetName = streetName;
        this.fileName = fileName;
        this.api = api;
        this.redisKey = this.fileName + ":" + this.api + ":" + this.streetName
    }
    
}

