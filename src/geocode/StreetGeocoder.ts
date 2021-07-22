import { EsriStreetQuery } from "./esri"
import { GeocodeError } from "./GeocodeError"
import IDrawableStreet from "./IDrawableStreet"
import { OverpassStreetQuery } from "./overpass"

/**
 * Internal Interface to store streets with identifiers
 */
interface GeocodedStreet {
    street: IDrawableStreet | undefined
    streetName: string
}

/**
 * Geocoder for Streets. Caches results. Singleton
 */
export class StreetGeocoder {

    private geocodedStreets: GeocodedStreet[] = []
    private static instance: StreetGeocoder | null = null

    /**
     * Get the Instance
     * @returns The Singleton Instance
     */
    public static getInstance(): StreetGeocoder {
        if (this.instance === null) {
            this.instance = new StreetGeocoder()
        }
        return this.instance
    }

    /**
     * Is there a better way?
     */
    private constructor() { }

    /**
     * Geocodes a given street using the Overpass Api and the esri geocoder as fallback to an IDrawableStreet
     * @param streetName name of the street to geocode
     * @param overpassAreaId the overpass area id
     * @param esriQuerySuffix the esri query suffix
     * @returns the street or undefined if an error occurs
     * @throws a GeocodeError if there are Network Issues or the request is denied
     */
    public async geocodeStreet(streetName: string, overpassAreaId: string, esriQuerySuffix: string): Promise<IDrawableStreet | undefined> {
        //check if cached
        let lookup: GeocodedStreet | undefined = this.geocodedStreets.find((element: GeocodedStreet) => element.streetName === streetName)
        if (lookup) {
            //retrun if cached
            return lookup.street
        }
        //geocode
        let geocodedStreet: IDrawableStreet | undefined = undefined
        try {
            geocodedStreet = await this.geocodeStreetOverpass(streetName, overpassAreaId)
            if (geocodedStreet) {
                return geocodedStreet
            }
            geocodedStreet = await this.geocodeStreetEsri(streetName, esriQuerySuffix)
            this.geocodedStreets.push({ street: geocodedStreet, streetName: streetName })
        } catch (error) {
            throw new GeocodeError("API error. Could not geocode the street", 'NetworkFailure')
        }
        //returns undefined if not resolvable
        return geocodedStreet
    }


    /**
     * Geocodes a given street to an IDrawableStreet
     * @param streetName name of the street to geocode
     * @param overpassAreaId the overpass area id
     * @returns the street or undefined if an error occurs
     * @throws a GeocodeError if there are Network Issues or the request is denied
     */
    async geocodeStreetOverpass(streetName: string, overpassAreaId: string): Promise<IDrawableStreet | undefined> {

        let opQuery = new OverpassStreetQuery(streetName, overpassAreaId)
        try {
            await opQuery.execute()
            return opQuery.getDrawableStreet()
        } catch (error) {
            if (error instanceof GeocodeError && error.getCause() === 'NotResolvable') {
                return undefined
            }
            throw error
        }
    }

    /**
     * Geocodes a given street to an IDrawableStreet
     * @param streetName name of the street to geocode
     * @param esriQuerySuffix the esri query suffix
     * @returns the street or undefined if an error occurs
     * @throws a GeocodeError if there are Network Issues or the request is denied
     */
    async geocodeStreetEsri(streetName: string, esriQuerySuffix: string): Promise<IDrawableStreet | undefined> {
        let esriQuery = new EsriStreetQuery(streetName, esriQuerySuffix)
        try {
            await esriQuery.execute()
            return esriQuery.getDrawableStreet()
        } catch (error) {
            if (error instanceof GeocodeError && error.getCause() === 'NotResolvable') {
                return undefined
            }
            throw error
        }

    }
}
