import { Marker as MarkerObject, LatLngExpression, LatLng, latLng } from "leaflet"
import { Marker, Popup } from "react-leaflet"
import { IconGuess } from "./MarkerIcon"
import { useMemo, useRef, useState } from "react";


interface Props {
    position: LatLngExpression,
    question: string,
    onPositionUpdate:(position:LatLng) => void,
}

export const GuessMarker = (props: Props) => {
    const markerRef = useRef<MarkerObject>(null)
    const onPosUppdate:(position:LatLng) => void =props.onPositionUpdate
    const [position, setPosition] = useState<LatLng>(latLng(props.position))

    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current
          if (marker != null) {
            setPosition(marker.getLatLng())
            onPosUppdate(marker.getLatLng())
          }
        },
      }),
      [onPosUppdate],
    )

  
        /*
        Nominatim.reverseGeocode({
            lat: l.lat.toString(),
            lon: l.lng.toString(),
            addressdetails: true
        })
            .then((result: CustomNominatimResponse) => {
                console.log(result);
                console.log(result.address);
                console.log(result.address.road);
            })
            .catch((error: any) => {
                console.error(error);
            });
    
     */
    return (
        <Marker position={position} draggable={true} icon={IconGuess} ref={markerRef} eventHandlers={eventHandlers}>
            <Popup>
                {`Your guess for: ${props.question}`}
            </Popup>
        </Marker>
    )
}