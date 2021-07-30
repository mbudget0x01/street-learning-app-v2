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
 * Fetches a Street from the Overpass API
 * @param streetName name of the street to fetch
 * @param OverpassAreaId The overpass Area ID to look for in
 * @returns List of Elements, Throws a GeocodeError if is not resolvable or request failed
 */
export const fetchStreet = async (
  streetName: string,
  OverpassAreaId: string
): Promise<Elements[]> => {
  let elements: Elements[] = []
  try {
    const query = `[out:json][timeout:25];area(${OverpassAreaId})->.searchArea;(node["name"="${streetName}"](area.searchArea);way["name"="${streetName}"](area.searchArea);relation["name"="${streetName}"](area.searchArea););out body;>;out skel qt;`;

    const formBody = "data=" + encodeURIComponent(query);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
      body: formBody
    };
    const response = await fetch(`/geocode/proxy/overpass`, requestOptions);
    const data = await response.json();
    elements = data.elements
  } catch (err) {
    throw new GeocodeError("Overpass Client API request failed.", 'NetworkFailure')
  }


  if (elements.length === 0) {
    throw new GeocodeError("Street Name is unknown to the Overpass API.", 'NotResolvable')
  }
  return elements;
};