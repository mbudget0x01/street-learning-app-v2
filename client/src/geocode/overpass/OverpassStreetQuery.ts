import { LatLng } from "leaflet";
import { IDrawableStreet, IDrawablePolyLine, IDrawableStreetProperty } from "..";
import { LearningFile } from "../../learningFileHandling";
import { GeocodeError } from "../GeocodeError";
import { Elements, fetchStreet } from "./OverpassApi";

export class OverpassStreetQuery {
    private streetName: string;
    private drawableWayPoints: LatLng[][] | undefined
    private wayPointElements: Elements[] = []
    private streetPoi: IDrawableStreetProperty[] = []
    private center: LatLng | undefined;
    private executed: boolean = false
    private learningFile: LearningFile

    constructor(streetName: string, learningFile: LearningFile) {
        this.streetName = streetName;
        this.learningFile = learningFile
    }

    /**
     * Getter for the street name
     * @returns Street Name as String
     */
    public getStreetName(): string {
        return this.streetName
    }

    /**
     * Fetches the street data from the overpass api
     * @returns An array containing the orderd lines to draw polylines with
     */
    public async execute(): Promise<LatLng[][]> {
        if (this.executed && this.drawableWayPoints) {
            throw new GeocodeError("Multiple Request, don't spam the API", 'undefined')
        }

        this.executed = true
        if (this.drawableWayPoints) {
            return this.drawableWayPoints;
        }

        let resp: Elements[] = await fetchStreet(this.streetName, this.learningFile.overpassAreaId, this.learningFile.fileName)


        let wayNodes: Elements[] = [];
        let tmpArray: LatLng[][] = [];

        //split descriptive nodes from waypoints
        resp.forEach(element => {
            if (element.type === "way" && element.tags.public_transport !== "platform") {
                wayNodes.push(element);
            }
            if (element.type === "node") {
                this.wayPointElements.push(element);
            }
        });


        //order waypoints to multiple arrays representing a polygon line
        wayNodes.forEach(n => {
            let nodeWaypoints: LatLng[] = [];
            if (!n.nodes) {
                return
            }

            n.nodes.forEach(element => {
                let searchedElement = this.wayPointElements.find((s) => s.id === element)
                if (searchedElement !== undefined && searchedElement.lat && searchedElement.lon) {
                    nodeWaypoints.push(new LatLng(searchedElement.lat, searchedElement.lon))
                }
            })


            //check if oneway
            if (n.tags.oneway === "yes") {

                this.streetPoi.push({
                    name: "oneWay",
                    position: new LatLng(nodeWaypoints[0].lat, nodeWaypoints[0].lng),
                    type: "oneWayEntrance"
                })



                this.streetPoi.push({
                    name: "oneWay",
                    position: new LatLng(nodeWaypoints[nodeWaypoints.length - 1].lat, nodeWaypoints[nodeWaypoints.length - 1].lng),
                    type: "oneWayExit"
                })
            }

            tmpArray.push(nodeWaypoints)

        }
        );

        this.drawableWayPoints = tmpArray

        if (this.streetPoi.length > 2) {


            let toDelete: IDrawableStreetProperty[] = [];
            for (let index = 0; index < this.streetPoi.length; index++) {
                
                for (let index2 = 0; index2 < this.streetPoi.length; index2++) {
                    if(this.streetPoi[index].position.distanceTo(this.streetPoi[index2].position) < 30 && index !== index2){
                        toDelete.push(this.streetPoi[index])
                    }
                    
                }
                
                
                
            }            
            this.streetPoi = this.streetPoi.filter((value) => !toDelete.includes(value))
        }

        return this.drawableWayPoints;
    }

    /**
     * An array containing the orderd lines to draw polylines with
     * @returns undefined if not loaded else the drawable waypoints
     */
    public getDrawableWayPoints(): LatLng[][] | undefined {
        return this.drawableWayPoints;
    }

    /**
     * Indicates if data is loaded otherwise consider execute() or wait for the transfer to finish
     * @returns True if data is present
     */
    public dataIsReady(): boolean {
        return this.drawableWayPoints !== undefined;
    }

    public getCenter(): LatLng | undefined {
        if (this.drawableWayPoints === undefined) {
            return undefined
        }
        if (this.center === undefined) {
            this.center = this.calculateCenter()
        }

        return this.center

    }

    /**
     * Calculates a crude center
     * @returns LatLng Object Marking the arithmetic center of all Waypoints
     */
    private calculateCenter(): LatLng {
        let latTotal: number = 0;
        let lngTotal: number = 0;
        this.wayPointElements.forEach(element => {
            if (element.lat && element.lon) {
                latTotal += element.lat
                lngTotal += element.lon
            }
        });
        let latCenter = latTotal / this.wayPointElements.length
        let lngCenter = lngTotal / this.wayPointElements.length
        //return center of All Waypoints
        return new LatLng(latCenter, lngCenter)

    }

    /**
     * Returns an instance of IDrawableStreet to pass to the map 
     * @returns IDrawable Street if data is loaded or undefined if not execute() is called or api call is in progress
     */
    public getDrawableStreet(): IDrawableStreet | undefined {
        let center = this.getCenter()

        if (this.drawableWayPoints === undefined || center === undefined) {
            return undefined
        }
        let polyLines: IDrawablePolyLine[] = [];
        this.drawableWayPoints.forEach((wayPoints: LatLng[]) => {
            polyLines.push(
                {
                    wayPoints: wayPoints
                }
            )
        })

        let poi: IDrawableStreetProperty[] | undefined;
        if (this.streetPoi.length === 0) {
            poi = undefined;
        } else {
            poi = this.streetPoi
        }



        return { name: this.streetName, pathOption: {}, center: center, polyLines: polyLines, specialProperties: poi }
    }

}