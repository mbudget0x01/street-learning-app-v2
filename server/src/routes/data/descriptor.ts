import { jsonFileRoute } from "./jsonRoute";

export const descriptorRoute = (app, fs) => {
    // path
    const dataPath = './data/streets/descriptor.json';
    const uri = '/descriptor'
    jsonFileRoute(app,fs,dataPath,uri)
  };