import { ILearningFile } from "./ILearningFile";
import { LearningFile } from "./LearningFile";

/**
 * Fetches all ILearningFiles specified in the descriptor.json
 * @returns List of ILearningFiles
 */
async function fetchILearningFiles(): Promise<LearningFile[]> {
    let response = await fetch('assets/streets/descriptor.json')
    let text = await response.text()


    let a: ILearningFile[] = JSON.parse(text);
    let resp: LearningFile[] = [];
    a.forEach(element => {
        resp.push(new LearningFile(element))
    });
    return resp;
}

/**
 * Fetches the LearningFile containing the street Names
 * @param fileName Name of the file conataing the streets, specified in the descriptor.json
 * @returns Lits of String with all StreetNames specified in the json file
 */
export async function fetchStreets(fileName: string) {
    let response = await fetch('assets/streets/' + fileName)
    let text = await response.text()
    let a: string[] = JSON.parse(text);

    return a;
}

/**
 * Fetches all the file data from descriptor.json and returns a List of LearningFile
 * @returns List of LearningFile
 */
export function loadLearningFiles(): LearningFile[] {
    let learningFiles: LearningFile[] = []
    fetchILearningFiles().then((intrfces: ILearningFile[]) => {
        intrfces.forEach((intrfce: ILearningFile) => {
            learningFiles.push(new LearningFile(intrfce))
        }
        )
    }
    )
    return learningFiles
}