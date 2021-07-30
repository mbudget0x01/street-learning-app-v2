export interface ICachedObject{
    getRedisKey: () => string,
    data?:string
}

export function getCachedObject(object:ICachedObject):string | undefined{
    //check object here
    return undefined
}

export function setCachedObject(object:ICachedObject):void{
    //do stuff
    console.log(object.getRedisKey());
    console.log(object.data);   
}