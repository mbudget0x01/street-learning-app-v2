import { LayersControl, MapContainer, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import './Map.css'
import { ThemeType } from "../theme";
import { StreetOverpass } from "./StreetOverpass";

interface Props {
    uiMode: ThemeType
}
export const Map = (props: Props) => {

    return (
        <MapContainer center={[47.538002, 7.571211]} zoom={20} scrollWheelZoom={true} zoomControl={true} boxZoom={false}>
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
            <StreetOverpass OverpassAreaId={"3601683625"} query={"Hauptstrasse"}/>
        </MapContainer>
    )
}