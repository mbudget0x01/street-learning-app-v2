import { ICachedObject } from "../cache/cachedObject";

export interface ICachedStreet{
    streetName:string,
    api:CachedStreetApi,
    fileName:string,
    data?:string
}

type CachedStreetApi = "overpass" | "esri"

export class CachedStreet implements ICachedStreet, ICachedObject{
    streetName: string;
    api: CachedStreetApi;
    fileName: string;
    data:string;
    redisKey:string = "";
    //30 days
    expirationTime: number= 60 * 60 * 24 * 30;

    constructor(intrfce:ICachedStreet){
        this.streetName = intrfce.streetName;
        this.fileName = intrfce.fileName;
        this.api = intrfce.api;
        this.redisKey = this.fileName + ":" + this.api + ":" + this.streetName
    }
    
}

