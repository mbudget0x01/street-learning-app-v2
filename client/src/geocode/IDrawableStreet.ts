import { LatLng, PathOptions } from "leaflet";
import { IDrawablePolyLine } from "./IDrawablePolyLine";
import { IDrawableStreetProperty } from "./IDrawableStreetProperty";

/**
 * Interface containing all values needed for the street element to display it
 */
export interface IDrawableStreet{
    name:string,
    pathOption?: PathOptions,
    center:LatLng,
    polyLines?: IDrawablePolyLine[] | undefined,
    specialProperties?:IDrawableStreetProperty[] | undefined
}