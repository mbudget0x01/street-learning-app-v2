import { LatLng } from "leaflet";
import { CustomNominatimResponse } from "../map/nominatim/CustomNominatimResponse";
import * as Nominatim from "nominatim-browser"

export async function isSameStreet(position:LatLng, streetName:string):Promise<boolean>{

    //prevent stupid requests
    if(streetName === "" || (position.lat === 0 && position.lng === 0)){
        return false
    }

    let result:CustomNominatimResponse = await Nominatim.reverseGeocode({
        lat: position.lat.toString(),
        lon: position.lng.toString(),
        addressdetails: true
    })

    return result.address.road === streetName

}