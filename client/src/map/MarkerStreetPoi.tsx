import { Marker } from "react-leaflet"
import { IDrawableStreetProperty } from "../geocode"
import { IconOnWayRoadEnter, IconOnWayRoadExit } from "./MarkerIcons"

interface Props {
    /**
     * Where to place the marker
     */
    data: IDrawableStreetProperty
}
/**
 * Marker to Pinpoint an approximate Position of a Street on the Map. Has a fixed position
 * @param props Props object
 * @returns a Leaflet Marker to add to a Map
 */
export const MarkerStreetPoi = (props: Props) => {
    var icon:L.Icon;

    switch (props.data.type) {
        case "oneWayEntrance":
            icon = IconOnWayRoadEnter
            break;
        case "oneWayExit":
            icon = IconOnWayRoadExit
            break;
    }
    
    return (
        <Marker position={props.data.position} draggable={false} icon={icon} />
    )
}