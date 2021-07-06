import { latLng, LatLngExpression } from "leaflet"
import { EsriProvider } from "leaflet-geosearch"
import { SearchResult } from "leaflet-geosearch/dist/providers/provider"
import { useState } from "react"
import { Polyline } from "react-leaflet"

interface Props {
    provider: EsriProvider,
    query: string
}


export const Street = (props: Props) => {

    const [bounds, setBounds] = useState<LatLngExpression[] | LatLngExpression[][]>([latLng(0, 0)])
    const [resolvedQuery, setResolvedQuery] = useState<string>("")
    const [isResolvingQuery, setIsResolvingQuery] = useState<boolean>(false)
    const redOptions = { color: 'red' }


    if (resolvedQuery !== props.query && !isResolvingQuery) {
        setIsResolvingQuery(true);
        setResolvedQuery(props.query.valueOf());
        props.provider.search(
            { query: props.query }
        ).then((results: SearchResult<any>[]) => {

            console.log("searching", results)
            if (results[0]?.bounds != null) {
                setBounds(results[0].bounds)
                setIsResolvingQuery(false)
            }

        }
        ).catch((error) => {
            console.count(error);

        }
        )
    }


    return (


        <Polyline pathOptions={redOptions} positions={bounds} />
    )
}