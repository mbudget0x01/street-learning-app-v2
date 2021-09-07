import { jsonFileRoute } from "./jsonRoute";

export const feedbackTextRoute = (app, fs) => {
    // path
    const dataPath = './data/text/question-feedback.json';
    const uri = '/feedback/text'
    jsonFileRoute(app,fs,dataPath,uri)
  };