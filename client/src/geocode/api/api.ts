/**
 * Fetch a Street via the server api using the cache
 * @param url url to fetch from see API docs
 * @returns the data as string (use e.g JSON.parse())
 */
export const fetchStreetCache = async (url:string):Promise<any> => {
    const response = await fetch(url)
    const data = await response.json()
    return data
}