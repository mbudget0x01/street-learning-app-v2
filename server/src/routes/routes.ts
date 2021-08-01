import { descriptorRoute } from "./data/descriptor";
import { streetsRoute } from "./data/streets";
import { esriRoute } from "./geocode/esri";
import { nominatimRoute } from "./geocode/nominatim";
import { overpassRoute } from "./geocode/overpass";
import { overpassProxyRoute } from "./geocode/overpassProxy";
import proxy from "express-http-proxy"

const isProxy = process.env.IS_PROXY || false;
const proxiedHost = process.env.PROXY_HOST || "false";

export const appRouter = (app, fs) => {

  descriptorRoute(app, fs);
  streetsRoute(app, fs)
  overpassRoute(app)
  overpassProxyRoute(app)
  nominatimRoute(app)
  esriRoute(app)

  //if none of the routes proxy to react app
  if (isProxy) {
    console.log(`Redirecting traffic to Host: ${proxiedHost} `);
    app.use('/', proxy(proxiedHost));
  }
};