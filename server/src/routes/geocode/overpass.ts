import { CachedStreet } from "../../geocode/cachedStreet";
import { getStreet } from "../../geocode/OverpassApi";

export const overpassRoute = (app) => {    
    const uri = '/geocode/overpass/:fileName/:overpassAreaID/:streetName'

     app.get(uri, async (req, res) => {
        let s = await getStreet(new CachedStreet(req.params.streetName, req.params.fileName, "overpass"),req.params.overpassAreaID) 
        res.send(s)
      });
  };