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
    
    console.log("eq", streetsConsideredEqual(result.address.road, streetName, [ Number(result.lat),Number(result.lon)],position));
    
    return streetsConsideredEqual(result.address.road, streetName, [ Number(result.lat),Number(result.lon)],position)
    //return result.address.road === streetName
}
/**
 * If distance of positions is greater then this returns false
 */
const maxDistance:number = 1000.0;

/**
 * If distance is below this value then this returns true
 */
const correctThreshold:number = 50.0;

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
        
        //last effort calculating the distance to the supplied approximate position
        let distance:number = latLng(guessedPosition).distanceTo(latLng(streetGeometricCenter))
        console.log(distance);
        
        
        //as this usually concernes small roads, if distance > 1000m we return false per default
        if( distance > maxDistance){
            return false
        }
        //if is within 50m from marker its save to say its correct
        if(distance <= correctThreshold){
            return true
        }
        //not possible to identify
        return undefined
    }
}


function streetsConsideredEqual(street1Name:string, street2Name:string, street1Center:LatLngExpression, street2Center:LatLngExpression):boolean{
    const objectablePrefixes:string[] = ["im "]
    const considerdEqualDistanceThreshold:number = 100.0
    
    const internalStreet1Name = street1Name.toLocaleLowerCase()
    const internalStreet2Name = street2Name.toLocaleLowerCase()
    if(internalStreet1Name === internalStreet2Name){
        return true
    }
    

    for (let index = 0; index < objectablePrefixes.length; index++) {
        const prefix = objectablePrefixes[index];
        
        const s1:string = removeStreetNamePrefix(prefix, internalStreet1Name)
        const s2:string = removeStreetNamePrefix(prefix, internalStreet2Name)

        console.log(latLng(street1Center).distanceTo(street2Center));
        console.log(latLng(street1Center).distanceTo(street2Center) <= considerdEqualDistanceThreshold);
        
        

        if(s1 === s2 && latLng(street1Center).distanceTo(street2Center) <= considerdEqualDistanceThreshold ){           
            return true
        }
    }
    
    return false
}

/**
 * Removes a given prefix from a string, is not case sensitive
 * @param prefix the prefix to remove
 * @param streetName the streetName to remove the prefix from
 * @returns streetName without prefix or if street name doesn't start with prefix the original name
 */
function removeStreetNamePrefix(prefix:string, streetName:string):string{
    //if not starts with prefix return street name --- yes toLower.. is doubled but i might want to reuse this
    if(!streetName.toLocaleLowerCase().startsWith(prefix.toLocaleLowerCase())){
        return streetName
    }
    //remove length of prefix from start as we know the chars match
    return streetName.substring(prefix.length, streetName.length)
}