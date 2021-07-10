import { GeocodeError } from "../GeocodeError";

const BASE_URL = "https://overpass.osm.ch/api/interpreter";

export type Elements = {
  //be aware way nodes don't have this
  lat: number;
  //be aware way nodes don't have this
  lon: number;
  id: number;
  type: string;
  tags: {
    name: string;
    website: string;
    public_transport: string;
  };
  //be aware not all have this
  nodes: number[],
};

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
    const response = await fetch(`${BASE_URL}`, requestOptions);
    const data = await response.json();
    elements = data.elements
  } catch (err) {
    throw new GeocodeError("Overpass Client API request failed.", 'NetworkFailure')
  }


  if (elements.length === 0) {
    console.log("error");

    throw new GeocodeError("Street Name is unknown to the Overpass API.", 'NotResolvable')
  }
  return elements;
};

// https://overpass-api.de/api/interpreter?data=[out:json];%20%20%20%20%20%20node%20%20%20%20%20%20%20%20[amenity=college]%20%20%20%20%20%20%20%20(48.835474119784756,2.3644745349884033,48.874784201649106,2.407475709915161);%20%20%20%20%20%20out;
