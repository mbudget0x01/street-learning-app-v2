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
    private redisKey:string = "";

    constructor(intrfce:ICachedStreet){
        this.streetName = intrfce.streetName;
        this.fileName = intrfce.fileName;
        this.api = intrfce.api;
    }

    getRedisKey():string {
        if(this.redisKey === ""){
            this.redisKey = this.fileName + ":" + this.api + ":" + this.streetName
        }
        return this.redisKey
    }
}

