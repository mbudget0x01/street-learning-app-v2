import { LearningFile } from "../../fileHandling/LearningFile";

export function generateQuerySuffix(file:LearningFile){
    return `${file.city} ${file.zipCode} ${file.countryCode} locationType=street`
}