import { IDrawablePoint } from ".";

type IDrawableStreetPropertyTypes = "oneWayEntrance" | "oneWayExit"

/**
 * Interface representing one way markers and similar properties
 */
export interface IDrawableStreetProperty extends IDrawablePoint{
    type: IDrawableStreetPropertyTypes
}