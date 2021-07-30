import { descriptorRoute } from "./data/descriptor";
import { streetsRoute } from "./data/streets";
import { overpassRoute } from "./geocode/overpass";
import { overpassProxyRoute } from "./geocode/overpassProxy";

export const appRouter = (app, fs) => {

    app.get('/', (req, res) => {
        res.send('welcome to the api-server');
      });

      descriptorRoute(app, fs);
      streetsRoute(app,fs)
      overpassRoute(app,fs)
      overpassProxyRoute(app, fs)
};