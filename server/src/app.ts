import express from 'express';
import fs from 'fs';
import { getApiPort, logSettings } from './config';
import {appRouter} from "./routes/routes"

const app = express();
//printing settings
logSettings();

const port = getApiPort();

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

appRouter(app,fs)


app.listen(port, (() => {
  return console.log(`server is listening on ${port}`);
}))