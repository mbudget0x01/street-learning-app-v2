import { LayersControl, MapContainer, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import './Map.css'
import { ThemeType } from "../theme";
import { StreetOverpass } from "./StreetOverpass";
import { useCallback, useEffect, useState } from "react";
import { LatLng, LatLngExpression, LeafletMouseEvent, LeafletMouseEventHandlerFn, Map as LeafletMap } from 'leaflet';
import { GuessMarker } from "./GuessMarker";
import { GeocodeError } from "../geocode/GeocodeError";

interface Props {
    uiMode: ThemeType,
    query: string,
    question: string | undefined,
    onGuessLocationUpdate: (position: LatLng) => void,
    initialCoordinates: LatLngExpression,
    //is this needed?
    onGeocodeError: (error: GeocodeError) => void,
}
export const Map = (props: Props) => {

    const [mapObject, setMapObject] = useState<LeafletMap>()
    const [markerPos, setMarkerPos] = useState<LatLngExpression>(props.initialCoordinates)


    const flyToPos = useCallback((pos: LatLngExpression) => {
        if (mapObject) {
            mapObject?.flyTo(pos);
        }
    }, [mapObject])

    const onMapCreated = (map: LeafletMap) => {
        setMapObject(map)
        map.addEventListener("click", onMapClickedEventHandler)
    }


    const onMapClickedEventHandler: LeafletMouseEventHandlerFn = (event: LeafletMouseEvent) => {
        setMarkerPos(event.latlng)
        props.onGuessLocationUpdate(event.latlng)
    }

    const onGuessMarkerPosUpdate = (position: LatLng) => {
        setMarkerPos(position)
        props.onGuessLocationUpdate(position)
    }


    useEffect(() => {
        flyToPos(props.initialCoordinates)
        setMarkerPos(props.initialCoordinates)
    }, [props.initialCoordinates, flyToPos]);

    return (
        <MapContainer center={props.initialCoordinates} zoom={20} scrollWheelZoom={true} zoomControl={true} boxZoom={false} whenCreated={onMapCreated}>
            <LayersControl position="topright">
                <LayersControl.BaseLayer checked={props.uiMode === 'light'} name="Light" >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                        url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
                    />
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer checked={props.uiMode === 'dark'} name="Dark">
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                        url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
                    />
                </LayersControl.BaseLayer>
            </LayersControl>
            <StreetOverpass OverpassAreaId={"3601683625"} query={props.query} onCenterChanged={flyToPos} onGeocodeError={props.onGeocodeError} />
            <GuessMarker position={markerPos} question={props.question} onPositionUpdate={onGuessMarkerPosUpdate} />
        </MapContainer>
    )
}