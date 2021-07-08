import { LayersControl, MapContainer, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import './Map.css'
import { ThemeType } from "../theme";
import { StreetOverpass } from "./StreetOverpass";
import { useState } from "react";
import { LatLng, LatLngExpression, LeafletMouseEvent, LeafletMouseEventHandlerFn, Map as LeafletMap } from 'leaflet';
import { GuessMarker } from "./GuessMarker";

interface Props {
    uiMode: ThemeType,
    query: string,
    onGuessLocationUpdate: (position:LatLng) => void
}
export const Map = (props: Props) => {

    const [mapObject, setMapObject] = useState<LeafletMap>()
    const [markerPos, setMarkerPos] = useState<LatLngExpression>([47.538002, 7.571211])
    

    const flyToPos = (pos: LatLngExpression) => {
        if (mapObject) {
            mapObject?.flyTo(pos);
        }
    }

    const onMapCreated = (map:LeafletMap) => {
        setMapObject(map)
        map.addEventListener("click", onMapClickedEventHandler)
    }


    const onMapClickedEventHandler:LeafletMouseEventHandlerFn = (event:LeafletMouseEvent) => {
        console.log("clicked", event);
        
        setMarkerPos(event.latlng)
    }
    
    const onGuessMarkerPosUpdate = (position:LatLng) => {
        setMarkerPos(position)
        props.onGuessLocationUpdate(position)
    }
    return (
        <MapContainer center={[47.538002, 7.571211]} zoom={20} scrollWheelZoom={true} zoomControl={true} boxZoom={false} whenCreated={onMapCreated}>
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
            <StreetOverpass OverpassAreaId={"3601683625"} query={props.query} onCenterChanged={flyToPos} />
            <GuessMarker position={markerPos} question={props.query} onPositionUpdate={onGuessMarkerPosUpdate} />
        </MapContainer>
    )
}