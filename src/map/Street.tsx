import { LatLngExpression } from 'leaflet';
import { Polyline } from 'react-leaflet';
import IDrawablePolyLine from '../geocode/IDrawablePolyLine';
import IDrawableStreet from "../geocode/IDrawableStreet";
import { MarkerPinpoint } from './MarkerPinpoint';

interface Props {
    drawableStreet: IDrawableStreet | undefined
    onCenterChanged: (pos: LatLngExpression) => void,
}

export const Street = (props: Props) => {

    if(props.drawableStreet === null || props.drawableStreet === undefined){
        //if street nothing don't render
        return <div/>
    }

    //center must be instance as per type definition
    props.onCenterChanged(props.drawableStreet.center)

    if (props.drawableStreet.polyLines !== undefined) {
        //render polylines
        let i:number = 0;
        const nextID = (polyLine:IDrawablePolyLine) => {
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