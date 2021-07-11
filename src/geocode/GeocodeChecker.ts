import { LatLng } from "leaflet";
import { CustomNominatimResponse } from "./nominatim/CustomNominatimResponse";
import * as Nominatim from "nominatim-browser"
import { GeocodeError } from "./GeocodeError";

export async function isSameStreetNominatim(position: LatLng, streetName: string): Promise<boolean> {

    let result: CustomNominatimResponse
    try {
        //prevent stupid requests
        if (streetName === "" || (position.lat === 0 && position.lng === 0)) {
            return false
        }

        result = await Nominatim.reverseGeocode({
            lat: position.lat.toString(),
            lon: position.lng.toString(),
            addressdetails: true
        })

    } catch (error) {
        throw new GeocodeError("Nominatim Client API request failed.", 'NetworkFailure')
    }

    if (result.address.road === undefined) {
        throw new GeocodeError("Street Name is unknown to the Nominatim API.", 'NotResolvable')
    }


    return result.address.road === streetName
}