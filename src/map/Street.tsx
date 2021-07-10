import { LatLngExpression } from 'leaflet';
import { useState } from 'react';
import { Polyline } from 'react-leaflet';
import IDrawableStreet from "../geocode/IDrawableStreet";

interface Props{
    drawableStreet:IDrawableStreet
}

export const Street = (props:Props)=>{
    const [street] = useState<IDrawableStreet>(props.drawableStreet)
    return (
        <div>
            {
                street.polyLines.map((waypoint: { wayPoints: LatLngExpression[] | LatLngExpression[][]; toString: () => string; }) =>
                    <Polyline pathOptions={street.pathOption} positions={waypoint.wayPoints} key={waypoint.toString() + Date.now().toString()} />
                )
            }
        </div>
    )
}