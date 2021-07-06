import { LatLng, LatLngExpression } from 'leaflet'
import { useState } from 'react'
import { Polyline } from 'react-leaflet'
import { fetchStreet, Elements } from './overpass/OverpassApi'

interface Props {
    OverpassAreaId: string,
    query: string
}

export const StreetOverpass = (props: Props) => {
    const redOptions = { color: 'red' }

    const [waypoints, setSetWaypoints] = useState<LatLngExpression[][]>([])
    const [fetchCompleted, setFetchCompleted] = useState<boolean>(false)

    if (!fetchCompleted) {
        setFetchCompleted(true)
        fetchStreet(props.query, props.OverpassAreaId).then((resp) => {
            if (resp == null) {
                return
            }

            let wayNodes: Elements[] = [];
            let nodes: Elements[] = [];
            let nodesToDraw: LatLng[][] = [];

            //split descriptive nodes from waypoints
            resp.forEach(element => {
                if (element.type === "way") {
                    wayNodes.push(element);
                }
                if (element.type === "node") {
                    nodes.push(element);
                }
            });

            //order waypoints to multiple arrays representing a polygon line
            wayNodes.forEach(n => {
                let nodeWaypoints: LatLng[] = [];
                n.nodes.forEach(element => {
                    let searchedElement = nodes.find((s) => s.id === element)
                    if (searchedElement !== undefined) {
                        nodeWaypoints.push(new LatLng(searchedElement.lat, searchedElement.lon))
                    }
                });
                
               nodesToDraw.push(nodeWaypoints);
            });

            //generate polylineWaypoints

            //stupid lifecycle
            setSetWaypoints(nodesToDraw)
        }
        )
    }
    return (
        <div>
            {
                waypoints.map((waypoint) =>
                <Polyline pathOptions={redOptions} positions={waypoint} key={waypoint.toString()+ Date.now().toString()}/>
                )
            }
        </div>
    )
}