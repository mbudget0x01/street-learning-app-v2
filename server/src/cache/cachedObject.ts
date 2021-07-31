import { existsAsync, getAsync, setAsync } from "./redisClient";

/**
 * Representing a cachable Object
 */
export interface ICachedObject {
    redisKey: string,
    data?: string
    expirationTime: number
}

/**
 * Returns the value of a cachable object if object is unknown returns undefined
 * @param object ICached Object to look for
 * @returns string value if found or undefined if not cached
 */
export async function getCachedObjectValue(object: ICachedObject): Promise<string | undefined> {
    let objectExists: boolean = await cachedObjectExists(object)

    if (objectExists) {
        return await getAsync(object.redisKey)
    }
    return undefined

}

/**
 * Returns the value of a cachable object if object is unknown returns undefined
 * @param object ICached Object to look for
 * @returns object with data property, data is undefined if not existing
 */
export async function getCachedObject(object:ICachedObject):Promise<ICachedObject> {
    object.data = await getCachedObjectValue(object)
    return object
}
/**
 * Returns true if object exists
 * @param object Object to look for
 * @returns true if exists
 */
async function cachedObjectExists(object: ICachedObject): Promise<boolean> {
    let rawExists: number = await existsAsync(object.redisKey)
    return Boolean(rawExists).valueOf()
}
/**
 * Caches given object if data has a value
 * @param object Object to write to cache
 * @returns void
 */
export function setCachedObject(object: ICachedObject): void {
    //don't cache no data
    if (!object.data) {
        return
    }
    if (object.expirationTime > 0) {
        setAsync(object.redisKey, object.data)
    } else {
        setAsync(object.redisKey, object.data, 'EX', object.expirationTime)
    }
}