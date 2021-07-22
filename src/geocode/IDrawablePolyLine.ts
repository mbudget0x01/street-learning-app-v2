import { LatLng } from "leaflet";
/**
 * Interface representing a polyline wich can be drawe on a map
 */
export interface IDrawablePolyLine{
    /**
     * Orderd list of waypoints
     */
    wayPoints:LatLng[]
}