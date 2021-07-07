import { LayersControl, MapContainer, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import './Map.css'
import { ThemeType } from "../theme";
import { StreetOverpass } from "./StreetOverpass";
import { useState } from "react";
import { LatLngExpression, Map as LeafletMap } from 'leaflet';

interface Props {
    uiMode: ThemeType,
    query: string
}
export const Map = (props: Props) => {

    const [mapObject, setMapObject] = useState<LeafletMap>()

    const flyToPos = (pos: LatLngExpression) => {
        if (mapObject) {
            mapObject?.flyTo(pos);
        }
    }

    return (
        <MapContainer center={[47.538002, 7.571211]} zoom={20} scrollWheelZoom={true} zoomControl={true} boxZoom={false} whenCreated={map => setMapObject(map)}>
            <LayersControl position="topright">
                <LayersControl.BaseLayer checked={props.uiMode === 'light'} name="Light">
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
        </MapContainer>
    )
}