import { getStreet } from "../../geocode/OverpassApi";

export const overpassRoute = (app, fs) => {    
    const uri = '/geocode/overpass/:fileName/:overpassAreaID/:streetName'

     app.get(uri, async (req, res) => {
        console.log(req.params.fileName);
        let s = await getStreet({api:"overpass",fileName:req.params.fileName,streetName:req.params.streetName},req.params.overpassAreaID) 
        res.send(s)
      });
  };