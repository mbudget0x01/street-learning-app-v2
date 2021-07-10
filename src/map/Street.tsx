import { LatLngExpression } from 'leaflet';
import { Polyline } from 'react-leaflet';
import IDrawablePolyLine from '../geocode/IDrawablePolyLine';
import IDrawableStreet from "../geocode/IDrawableStreet";

interface Props {
    drawableStreet: IDrawableStreet | undefined
    onCenterChanged: (pos: LatLngExpression) => void,
}

export const Street = (props: Props) => {
    if (props.drawableStreet !== null && props.drawableStreet !== undefined) {

        props.onCenterChanged(props.drawableStreet.center)
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
    //if street nothing don't render
    return <div/>
}