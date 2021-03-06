import { IDrawableStreet } from "."
import { LearningFile } from "../learningFileHandling"
import { EsriStreetQuery } from "./esri"
import { GeocodeError } from "./GeocodeError"
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
     * @param learningFile the learningFile to query the qpis
     * @returns the street or undefined if an error occurs
     * @throws a GeocodeError if there are Network Issues or the request is denied
     */
    public async geocodeStreet(streetName: string, learningFile:LearningFile): Promise<IDrawableStreet | undefined> {
        //check if cached
        let lookup: GeocodedStreet | undefined = this.geocodedStreets.find((element: GeocodedStreet) => element.streetName === streetName)
        if (lookup) {
            //retrun if cached
            return lookup.street
        }
        //geocode
        let geocodedStreet: IDrawableStreet | undefined = undefined
        try {
            geocodedStreet = await this.geocodeStreetOverpass(streetName, learningFile)
            if (geocodedStreet) {
                return geocodedStreet
            }
            geocodedStreet = await this.geocodeStreetEsri(streetName, learningFile)
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
     * @param fileName name of the file the street belongs to
     * @returns the street or undefined if an error occurs
     * @throws a GeocodeError if there are Network Issues or the request is denied
     */
    async geocodeStreetOverpass(streetName: string, learningFile:LearningFile): Promise<IDrawableStreet | undefined> {

        let opQuery = new OverpassStreetQuery(streetName, learningFile)
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
     * @param learningFile for the informations needed to query the api
     * @returns the street or undefined if an error occurs
     * @throws a GeocodeError if there are Network Issues or the request is denied
     */
    async geocodeStreetEsri(streetName: string, learningFile:LearningFile): Promise<IDrawableStreet | undefined> {
        let esriQuery = new EsriStreetQuery(streetName, learningFile)
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
