import { ILearningFile } from "./ILearningFile";
import { LearningFile } from "./LearningFile";

export async function loadFiles(): Promise<LearningFile[]> {
    let response = await fetch('assets/streets/descriptor.json')
    let text = await response.text()


    let a: ILearningFile[] = JSON.parse(text);
    let resp: LearningFile[] = [];
    a.forEach(element => {
        resp.push(new LearningFile(element))
    });
    return resp;
}

export async function loadStreets(fileName:string) { 
    let response = await fetch('assets/streets/'+ fileName)
    let text = await response.text()
    let a: string[] = JSON.parse(text);
    
    return a;
}