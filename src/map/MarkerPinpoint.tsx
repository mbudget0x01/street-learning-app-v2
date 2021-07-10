import { LatLngExpression} from "leaflet"
import { Marker, Popup } from "react-leaflet"
import { IconPinpoint } from "./MarkerIcons"

interface Props {
    position: LatLngExpression,
    streetName: string,
}

export const MarkerPinpoint = (props: Props) => {
    return (
        <Marker position={props.position} draggable={false} icon={IconPinpoint}>
            <Popup>{`Approximate position for ${props.streetName}`}</Popup>
        </Marker>
    )
}