import { LearningFile } from "../../learningFileHandling/LearningFile";
import { EsriResponse } from "./esriResponse";

/**
 * Returns a query suffix to add to the street Names to query them properly
 * @param file LearningFile to get necessary information from
 * @returns the esri query suffix needed to query the street names.
 */
export function generateQuerySuffix(file:LearningFile){
    return `${file.city} ${file.zipCode} ${file.countryCode} locationType=street`
}

export async function fetchFromServer(file:LearningFile, streetName:string):Promise<EsriResponse>{
    let url = `/geocode/esri/${file.fileName}/${file.countryCode}/${file.city}/${file.zipCode}/${streetName}`
    let response= await fetch(url)
    let result:EsriResponse = await response.json()
    return result;
}