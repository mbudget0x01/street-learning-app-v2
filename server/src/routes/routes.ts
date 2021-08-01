import path from "node:path";
import { descriptorRoute } from "./data/descriptor";
import { streetsRoute } from "./data/streets";
import { esriRoute } from "./geocode/esri";
import { nominatimRoute } from "./geocode/nominatim";
import { overpassRoute } from "./geocode/overpass";
import { overpassProxyRoute } from "./geocode/overpassProxy";

export const appRouter = (app, fs) => {


  /*
  app.get('/', (req, res) => {
    res.send('welcome to the api-server');
  });
  */
  descriptorRoute(app, fs);
  streetsRoute(app, fs)
  overpassRoute(app)
  overpassProxyRoute(app)
  nominatimRoute(app)
  esriRoute(app)

  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client', 'index.html'));
  });
};