import { LayersControl, MapContainer, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import './Map.css'
import { ThemeType } from "../theme";
import { useCallback, useEffect, useState } from "react";
import { LatLng, LatLngExpression, LeafletMouseEvent, LeafletMouseEventHandlerFn, Map as LeafletMap } from 'leaflet';
import { MarkerGuess } from "./MarkerGuess";
import { Street } from "./Street";
import IDrawableStreet from "../geocode/IDrawableStreet";

/**
 * Props interface for Map Object
 */
interface Props {
    /**
     * UiMode, in dark Mode there is a default dark map
     */
    uiMode: ThemeType,
    /**
     * When the marker is set to a position
     */
    onGuessLocationUpdate: (position: LatLng) => void,
    /**
     * Initial Coordinates to center the map on after loading
     */
    initialCoordinates: LatLngExpression,
    /**
     * The street to display undefined if none
     */
    displayedStreet: IDrawableStreet | undefined,
    /**
     * Active Question -> Street Name to display in guess Marker
     */
    activeQuestion: string | undefined,
}

/**
 * Representing a leaflet Map and displays it. Can display a Street. If polylines are supplied
 * there wil be the a render of the street if only a Location is sopplied, a marker will be placed.
 * Additionaly has a guess marker which can be dragged or placed by clicking. This location is supplied by the callback.
 * @param props Props belonging to this object
 * @returns A Leaflet Map representation
 */
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
                <LayersControl.BaseLayer name="Satellite">
                    <TileLayer
                        attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    />
                </LayersControl.BaseLayer>
            </LayersControl>
            <Street drawableStreet={props.displayedStreet} onCenterChanged={(pos: LatLngExpression) => flyToPos(pos)} />
            <MarkerGuess position={markerPos} question={props.activeQuestion} onPositionUpdate={onGuessMarkerPosUpdate} />
        </MapContainer>
    )
}