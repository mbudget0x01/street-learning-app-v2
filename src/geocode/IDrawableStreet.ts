import { LatLng, PathOptions } from "leaflet";
import IDrawablePolyLine from "./IDrawablePolyLine";

export default interface IDrawableStreet{
    name:string,
    pathOption: PathOptions,
    center:LatLng,
    polyLines: IDrawablePolyLine[],
}