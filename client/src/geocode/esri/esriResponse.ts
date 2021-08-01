export interface EsriResponse{
    candidates:EsriCandidate[]

}

export interface EsriCandidate{
    address:string,
    location:{
        x:number, y:number
    },
    score:number,
}