import { LatLngExpression} from "leaflet"
import { Marker, Popup } from "react-leaflet"
import { IconPinpoint } from "./MarkerIcons"

interface Props {
    /**
     * Where to place the marker
     */
    position: LatLngExpression,
    /**
     * Street Name to display in text
     */
    streetName: string,
}
/**
 * Marker to Pinpoint an approximate Position of a Street on the Map. Has a fixed position
 * @param props Props object
 * @returns a Leaflet Marker to add to a Map
 */
export const MarkerPinpoint = (props: Props) => {
    return (
        <Marker position={props.position} draggable={false} icon={IconPinpoint}>
            <Popup>{`Approximate position for ${props.streetName}`}</Popup>
        </Marker>
    )
}