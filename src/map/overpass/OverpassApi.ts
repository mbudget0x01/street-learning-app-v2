const BASE_URL = "https://overpass.osm.ch/api/interpreter";

export type Elements = {
  lat: number;
  lon: number;
  id: number;
  type: string,
  tags: {
    name: string;
    website: string;
  };
  //be aware not all have this
  nodes: number[],
};

export const fetchStreet = async (
  streetName: string,
  OverpassAreaId: string
): Promise<Elements[]> => {
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
    return data.elements;
  } catch (err) {
    console.error(err);
    return [];
  }
};

// https://overpass-api.de/api/interpreter?data=[out:json];%20%20%20%20%20%20node%20%20%20%20%20%20%20%20[amenity=college]%20%20%20%20%20%20%20%20(48.835474119784756,2.3644745349884033,48.874784201649106,2.407475709915161);%20%20%20%20%20%20out;
