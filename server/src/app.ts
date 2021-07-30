import express from 'express';
//import bodyParser from 'body-parser';
import fs from 'fs';
import {appRouter} from "./routes/routes"

const app = express();
const port = 3001;

//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));

appRouter(app,fs)

app.listen(port, (() => {
  return console.log(`server is listening on ${port}`);
}))