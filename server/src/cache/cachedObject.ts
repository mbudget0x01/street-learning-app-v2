import { existsAsync, getAsync, setAsync } from "./redisClient";

/**
 * Expiration date 30 days
 */
const expirationTime:number = 60 * 60 * 24 * 30

/**
 * Representing a cachable Object
 */
export interface ICachedObject{
    getRedisKey: () => string,
    data?:string
}

/**
 * Returns the value of a cachable object if object is unknown returns undefined
 * @param object ICached Object to look for
 * @returns string value if found or undefined if not cached
 */
export async function getCachedObjectValue(object:ICachedObject):Promise<string | undefined>{
    let objectExists:boolean = await cachedObjectExists(object)
        
    if(objectExists){
        return await getAsync(object.getRedisKey())
    }
    return undefined
    
}
/**
 * Returns true if object exists
 * @param object Object to look for
 * @returns true if exists
 */
async function cachedObjectExists(object:ICachedObject):Promise<boolean>{
    let rawExists:number = await existsAsync(object.getRedisKey())
    return Boolean(rawExists).valueOf()
}
/**
 * Caches given object if data has a value
 * @param object Object to write to cache
 * @returns void
 */
export function setCachedObject(object:ICachedObject):void{
    if(!object.data){        
        return
    }
    setAsync(object.getRedisKey(),object.data, 'EX', expirationTime)
}