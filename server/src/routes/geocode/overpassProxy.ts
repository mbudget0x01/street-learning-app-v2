import proxy from "express-http-proxy"

const BASE_URL = "https://overpass.osm.ch/api/interpreter";

export const overpassProxyRoute = (app, fs) => {
    //dono why this must be like this but okay
    app.use('/geocode/proxy/overpass', proxy(BASE_URL,{
        proxyReqPathResolver: function (req) {
           return BASE_URL
        }
    }))
  };