import { reverseGeocode } from "../../geocode/nominatim";

export const nominatimRoute = (app) => {
    const uri = '/geocode/nominatim'

    app.use(uri, async (req, res) => {
        let request:ReverseGeocodeRequest = req.body
        let resp = await reverseGeocode([request.lat, request.lng])        
        res.send(resp.data)
    });
};