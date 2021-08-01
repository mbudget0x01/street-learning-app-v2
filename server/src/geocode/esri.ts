import { URL } from "url";
import { getCachedObjectValue, setCachedObject } from "../cache/cachedObject";
import { CachedStreet } from "./cachedStreet";
import fetch from "node-fetch"

const API_ENDPOINT:string = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates"

export async function getStreet(cachedStreet: CachedStreet, countryCode: string, city: string, zip: string) {
    let cachedObject = await fetchFromCache(cachedStreet);
    
    if (cachedObject.data){
        return cachedObject
    }
    return await fetchFromApi(cachedStreet, countryCode, city, zip)
}

function createParametrisizedURL(cachedStreet: CachedStreet, countryCode: string, city: string, zip: string): URL {
    let url = new URL(API_ENDPOINT)
    //build url params
    let params = {
        address2: cachedStreet.streetName,
        countryCode: countryCode,
        postal: zip,
        city: city,
        maxLocations: 1,
        locationType: "street",
        forStorage: false,
        f: "json"
    }
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    return url;
}

async function fetchFromApi(cachedStreet: CachedStreet, countryCode: string, city: string, zip: string): Promise<CachedStreet> {
    console.log("fetch from api");
    
    let url:URL = createParametrisizedURL(cachedStreet, countryCode, city, zip)
    let response = await fetch(url.href);
    //use first
    cachedStreet.data = await response.text();
    
    setCachedObject(cachedStreet)
    return cachedStreet
}

async function fetchFromCache(cachedStreet: CachedStreet): Promise<CachedStreet> {
    let val = await getCachedObjectValue(cachedStreet)
    cachedStreet.data = val
    return cachedStreet
}