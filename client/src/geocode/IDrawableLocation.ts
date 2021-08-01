import { LatLng } from "leaflet";
/**
 * Interface representing a drawable Location (e.g. Marker)
 */
export interface IDrawablePoint{
    name:string,
    position: LatLng,
}