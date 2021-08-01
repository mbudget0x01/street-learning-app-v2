import * as Nominatim from "nominatim-browser"
import { getCachedObject, setCachedObject } from "../cache/cachedObject"
import { CachedReverseGeocode } from "./cachedReverseGeocode"

export async function reverseGeocode(latLng: [number, number]):Promise<CachedReverseGeocode>
export async function reverseGeocode(latLng: [string, string]):Promise<CachedReverseGeocode>

export async function reverseGeocode(latLng: [any, any]):Promise<CachedReverseGeocode> {    
    let object:CachedReverseGeocode = new CachedReverseGeocode(String(latLng[0]),String(latLng[1]), "nominatim")
    object = await fetchFromCache(object)
    if(!object.data){
       object = await fetchFromAPi(latLng, object)
    }
    return object
}

async function fetchFromCache(object:CachedReverseGeocode):Promise<CachedReverseGeocode>{
    object = await getCachedObject(object)
    return object
}

async function fetchFromAPi(latLng: [any, any], object:CachedReverseGeocode):Promise<CachedReverseGeocode> {
    let result = await Nominatim.reverseGeocode({
        lat: String(latLng[0]),
        lon: String(latLng[1]),
        addressdetails: true
    })
    object.data = JSON.stringify(result)
    setCachedObject(object)
    return object
}