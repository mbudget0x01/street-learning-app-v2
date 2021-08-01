import proxy from "express-http-proxy"

const BASE_URL = "https://overpass.osm.ch/api/interpreter";

/**
 * Proxies old api
 * @param app 
 * @param fs 
 */
export const overpassProxyRoute = (app) => {
    //dono why this must be like this but okay
    app.use('/geocode/proxy/overpass', proxy(BASE_URL,{
        proxyReqPathResolver: function (req) {
           return BASE_URL
        }
    }))
  };