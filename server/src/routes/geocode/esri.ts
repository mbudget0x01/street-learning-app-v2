import { Request, Response } from "express";
import { CachedStreet } from "../../geocode/cachedStreet";
import { getStreet } from "../../geocode/esri";
export const esriRoute = (app) => {
    const uri = '/geocode/esri/:fileName/:countryCode/:city/:zip/:streetName'

    app.get(uri, async (req:Request, res:Response) => {
        try {
            let s = await getStreet(
                new CachedStreet(req.params.streetName, req.params.fileName, "esri"),
                req.params.countryCode,
                req.params.city,
                req.params.zip)
            res.send(s.data)
        } catch(error){
            console.warn("esri api error", error)
            res.statusCode = 500
            res.send(error)
        }
    });
};