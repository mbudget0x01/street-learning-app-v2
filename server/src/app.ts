import express from 'express';
import fs from 'fs';
import {appRouter} from "./routes/routes"

const app = express();
const port = 3001;

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

appRouter(app,fs)

app.listen(port, (() => {
  return console.log(`server is listening on ${port}`);
}))