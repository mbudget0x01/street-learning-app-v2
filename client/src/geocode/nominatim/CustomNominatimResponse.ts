//interafces to extract needed data

/**
 * Interface to parse the response given by the Nominatim Browser
 */
export interface CustomGeocodeAddress {
    "county": string;
    "city": string;
    "city_district": string;
    "construction": string;
    "continent": string;
    "country": string;
    "country_code": string;
    "house_number": string;
    "neighbourhood": string;
    "postcode": string;
    "public_building": string;
    "state": string;
    "suburb": string;
    "road":string;
}


/**
 * Interface to parse the response given by the Nominatim Browser
 */
export interface CustomNominatimResponse {
    address: CustomGeocodeAddress;
    boundingbox: string[];
    class: string;
    display_name: string;
    importance: number;
    lat: string;
    /**
     * [sic]
     */
    licence: string;
    lon: string;
    osm_id: string;
    osm_type: string;
    place_id: string;
    svg: string;
    type: string;
    extratags: any;
}