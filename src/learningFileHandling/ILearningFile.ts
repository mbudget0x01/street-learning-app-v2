/**
 * Interface matching the entries in the descriptor.json
 */
export interface ILearningFile{
    /**
     * Name of the File containing the Street Names
     */
    fileName: string;
    /**
     * Display Titel in the App
     */
    title: string;
    /**
     * Zip Code of the streets in the file
     */
    zipCode: string;
    /**
     * City where the streets are located
     */
    city: string;
    /**
     * Country Code where the streets are located e.g. fr
     */
    countryCode: string;
    /**
     * Overpass area ID of the streets
     */
    overpassAreaId: string;
    /**
     * Coordinates where the map should zoom to as starting point
     */
    startCoordinates: [number, number];
} 