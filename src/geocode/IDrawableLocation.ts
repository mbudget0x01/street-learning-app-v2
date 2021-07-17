import { LatLng } from "leaflet";
/**
 * Interface representing a drawable Location (e.g. Marker)
 */
export default interface IDrawablePoint{
    name:string,
    position: LatLng,
}