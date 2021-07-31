import { getCachedObjectValue, setCachedObject } from "../cache/cachedObject";
import { CachedStreet } from "./cachedStreet";
import fetch from "node-fetch"

const BASE_URL = "https://overpass.osm.ch/api/interpreter";

/**
 * Fetches a Street from the Overpass API
 * @param streetName name of the street to fetch
 * @param OverpassAreaId The overpass Area ID to look for in
 * @returns the request json response
 */
const fetchStreet = async (
  streetName: string,
  OverpassAreaId: string
): Promise<string> => {
    const query = `[out:json][timeout:25];area(${OverpassAreaId})->.searchArea;(node["name"="${streetName}"](area.searchArea);way["name"="${streetName}"](area.searchArea);relation["name"="${streetName}"](area.searchArea););out body;>;out skel qt;`;

    const formBody = "data=" + encodeURIComponent(query);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
      body: formBody
    };
    const response = await fetch(`${BASE_URL}`, requestOptions);
    const data = await response.text();
    return data
  
};

/**
 * Retrieves a street from cache if available or fetches it from the api
 * @param cachedStreet street you are looking for
 * @param overpassAreaID The overpass area id to look for
 * @returns ICachedStreet with data
 */
export async function getStreet(cachedStreet:CachedStreet, overpassAreaID:string):Promise<CachedStreet>{
  let data:string | undefined = await getCachedObjectValue(cachedStreet)
  
  if(data !== undefined){
    cachedStreet.data = data
    return cachedStreet;
  }
  data = await fetchStreet(cachedStreet.streetName, overpassAreaID)
  cachedStreet.data = data
  setCachedObject(cachedStreet)
  return cachedStreet
}