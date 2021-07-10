import { LatLng, LatLngExpression } from 'leaflet';
import React from 'react';
import { Polyline } from 'react-leaflet';
import IDrawablePolyLine from '../geocode/IDrawablePolyLine';
import IDrawableStreet from "../geocode/IDrawableStreet";
import { MarkerPinpoint } from './MarkerPinpoint';

interface Props {
    drawableStreet: IDrawableStreet | undefined
    onCenterChanged: (pos: LatLngExpression) => void,
}

export const Street = (props: Props) => {

    //needed to prevent subsequent zoom to center
    const [center, setCenter] = React.useState<LatLng | undefined>(undefined);

    if (props.drawableStreet === null || props.drawableStreet === undefined) {
        //if street nothing don't render
        return <div />
    }

    if (center === undefined || center !== props.drawableStreet.center) {
        //center must be instance as per type definition
        setCenter(props.drawableStreet.center)
        props.onCenterChanged(props.drawableStreet.center)
    }



    if (props.drawableStreet.polyLines !== undefined) {
        //render polylines
        let i: number = 0;
        const nextID = (polyLine: IDrawablePolyLine) => {
            i++
            return polyLine.wayPoints[0].toString() + i
        }
        return (
            <div>
                {
                    props.drawableStreet.polyLines.map((polyLine) =>
                        <Polyline pathOptions={{ color: 'red' }} positions={polyLine.wayPoints} key={nextID(polyLine)} />
                    )
                }
            </div>
        )
    }
    //render approx position
    return <MarkerPinpoint position={props.drawableStreet.center} streetName={props.drawableStreet.name} />
}