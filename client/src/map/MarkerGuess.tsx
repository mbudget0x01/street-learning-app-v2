import { Marker as MarkerObject, LatLngExpression, LatLng } from "leaflet"
import { Marker, Popup } from "react-leaflet"
import { IconGuess } from "./MarkerIcons"
import { useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";


interface Props {
  /**
   * The initial Markers position
   */
  position: LatLngExpression,
  /**
   * The street Name to display as question, if undefined "No question loaded will" be displayed
   */
  question: string | undefined,
  /**
   * Callback when the marker gets dragged
   */
  onPositionUpdate: (position: LatLng) => void,
}

export const MarkerGuess = (props: Props) => {

  const { t } = useTranslation("main");

  const markerRef = useRef<MarkerObject>(null)
  const onPosUppdate: (position: LatLng) => void = props.onPositionUpdate

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

  const markerText = () => {
    if (props.question === undefined) {
      return t("MarkerGuess.textUndefined")
    }
    return t("MarkerGuess.textStreetPrefix") + " " + props.question
  }

  return (
    <Marker position={props.position} draggable={true} icon={IconGuess} ref={markerRef} eventHandlers={eventHandlers}>
      <Popup>{markerText()}</Popup>
    </Marker>
  )
}