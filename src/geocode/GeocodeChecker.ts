import { latLng, LatLng, LatLngExpression } from "leaflet";
import { CustomNominatimResponse } from "./nominatim/CustomNominatimResponse";
import * as Nominatim from "nominatim-browser"
import { GeocodeError } from "./GeocodeError";

/**
 * Checks if the reverse Geocoded location equals the searched street, if pointed on a building it takes its address
 * @param position The guessed position
 * @param streetName The searched streets name
 * @returns true if is same
 * @throws a GeocodeError if fails or can't reverse Geocode the guessed position 
 */
async function isSameStreetNominatim(position: LatLng, streetName: string): Promise<boolean> {

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
/**
 * If distance of positions is greater than this return false
 */
const maxDistance:number = 1000;

/**
 * Compares if the guessed location is in the street provided
 * @param guessedPosition The guessed position of the street
 * @param streetGeometricCenter The geometric Center of a street or an approximate position
 * @param streetName Name of the street to guess
 * @returns true if it is same street, false if not or it is over maxDistance to center, undefined if no conclusion can be made
 */
export async function isSameStreet(guessedPosition: LatLngExpression, streetGeometricCenter: LatLngExpression, streetName: string): Promise<boolean | undefined> {
    try {
        return await isSameStreetNominatim(latLng(guessedPosition), streetName)
    }catch(error){
        //as this usually concernes small roads, if distance > 1000m we return false
        if(latLng(guessedPosition).distanceTo(latLng(streetGeometricCenter)) > maxDistance){
            return false
        }
        //not possible to identify
        return undefined
    }
}