import { LatLng, LatLngExpression } from 'leaflet';
import React from 'react';
import { Polyline } from 'react-leaflet';
import { IDrawableStreet, IDrawablePolyLine } from '../geocode';
import { MarkerPinpoint } from './MarkerPinpoint';

interface Props {
    /**
     * Street to display if is undefined this will render nothing
     */
    drawableStreet: IDrawableStreet | undefined
    /**
     * Callback when the Center of a Street has updated, e.g. the street has changed
     */
    onCenterChanged: (pos: LatLngExpression) => void,
}

/**
 * Renders a Street there a multiple cases how to render.
 * 1. If the drawable street is undefined, there will be none
 * 2. If the drawable street has a polyline this will be rendered as polyline
 * 3. If the drawable street has no polyline but a center this will be rendered as approximate position
 * @param props Props Object
 * @returns displays a Street according to the critereas discribed in the main description
 */
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
        // goofy id creation
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