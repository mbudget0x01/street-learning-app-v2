import { Marker as MarkerObject, LatLngExpression, LatLng } from "leaflet"
import { Marker, Popup } from "react-leaflet"
import { IconGuess } from "./MarkerIcon"
import { useMemo, useRef } from "react";


interface Props {
    position: LatLngExpression,
    question: string,
    onPositionUpdate:(position:LatLng) => void,
}

export const GuessMarker = (props: Props) => {
    const markerRef = useRef<MarkerObject>(null)
    const onPosUppdate:(position:LatLng) => void =props.onPositionUpdate

    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current
          if (marker != null) {
            onPosUppdate(marker.getLatLng())
          }
        },
      }),
      [onPosUppdate],
    )

  
    return (
        <Marker position={props.position} draggable={true} icon={IconGuess} ref={markerRef} eventHandlers={eventHandlers}>
            <Popup>
                {`Your guess for: ${props.question}`}
            </Popup>
        </Marker>
    )
}