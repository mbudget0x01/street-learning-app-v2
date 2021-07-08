import { Marker as MarkerObject, LatLngExpression, LatLng } from "leaflet"
import { Marker, Popup } from "react-leaflet"
import { IconGuess } from "./MarkerIcon"
import { useMemo, useRef } from "react";


interface Props {
    position: LatLngExpression,
    question: string | undefined,
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

    const markerText = () =>{
      if(props.question === undefined){
        return "No question loaded"
      }
      return `Your guess for: ${props.question}`
    }
  
    return (
        <Marker position={props.position} draggable={true} icon={IconGuess} ref={markerRef} eventHandlers={eventHandlers}>
            <Popup>{markerText()}</Popup>
        </Marker>
    )
}