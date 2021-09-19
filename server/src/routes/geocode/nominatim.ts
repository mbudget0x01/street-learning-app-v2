import { Request, Response } from "express";
import { reverseGeocode } from "../../geocode/nominatim";

export const nominatimRoute = (app) => {
    const uri = '/geocode/nominatim'

    app.use(uri, async (req:Request, res:Response) => {
        try{
        let request:ReverseGeocodeRequest = req.body
        let resp = await reverseGeocode([request.lat, request.lng])        
        res.send(resp.data)
        }catch (error) {
            console.warn("nominatim api error", error)
            res.statusCode = 500
            res.send(error)
          }
    });
};