import { Request, Response } from "express";
import { CachedStreet } from "../../geocode/cachedStreet";
import { getStreet } from "../../geocode/OverpassApi";

export const overpassRoute = (app) => {
  const uri = '/geocode/overpass/:fileName/:overpassAreaID/:streetName'

  app.get(uri, async (req:Request, res:Response) => {
    try {
      let s = await getStreet(new CachedStreet(req.params.streetName, req.params.fileName, "overpass"), req.params.overpassAreaID)
      res.send(s.data)
    } catch (error) {
      console.warn("overpass api error", error)
      res.statusCode = 500
      res.send(error)
    }
  });
};