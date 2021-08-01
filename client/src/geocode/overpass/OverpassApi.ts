import { fetchStreetCache } from "../api/api";
import { GeocodeError } from "../GeocodeError";

/**
 * Representing an Element of the response fetched from the Overpass Api
 */
export type Elements = {
  //be aware way nodes don't have this
  lat?: number;
  //be aware way nodes don't have this
  lon?: number;
  id: number;
  type: string;
  tags: {
    name: string;
    website: string;
    public_transport: string;
  };
  //be aware not all have this
  nodes?: number[],
};

/**
 * fetches a street using the overpass API using this server and cache
 * @param streetName Name of the street to fetch
 * @param overpassAreaId Overpass Area ID to look in
 * @param fileName Name of the learning file, needed for caching
 * @returns List of Elements, Throws a GeocodeError if is not resolvable or request failed
 */
export const fetchStreet = async (
  streetName: string,
  overpassAreaId: string,
  fileName:string): 
  Promise<Elements[]> => {
    let elements: Elements[] = []
    let url:string  = `/geocode/overpass/${fileName}/${overpassAreaId}/${streetName}`

    let rawData:any = await fetchStreetCache(url)
    elements = rawData.elements
    
    if (elements.length === 0) {
      throw new GeocodeError("Street Name is unknown to the Overpass API.", 'NotResolvable')
    }
    return elements
  }