import { LearningFile } from "../../fileHandling/LearningFile";

/**
 * Returns a query suffix to add to the street Names to query them properly
 * @param file LearningFile to get necessary information from
 * @returns the esri query suffix needed to query the street names.
 */
export function generateQuerySuffix(file:LearningFile){
    return `${file.city} ${file.zipCode} ${file.countryCode} locationType=street`
}