import { ICachedObject } from "../cache/cachedObject";

type reverseGeocodeApi= "nominatim"

export class CachedReverseGeocode implements ICachedObject{
    redisKey: string;
    data?: string;
    //cache lookups 10 mins
    expirationTime: number = 60*10;

    constructor(lat:string, lng:string, api:reverseGeocodeApi){
        this.redisKey = api+":lat:"+lat+":lng:"+lng    
    }


}