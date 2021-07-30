import * as Nominatim from "nominatim-browser"

export async function reverseGeocode(latLng: [number, number]):Promise<any>
export async function reverseGeocode(latLng: [string, string]):Promise<any>

export async function reverseGeocode(latLng: [any, any]):Promise<any> {    
    let result = await Nominatim.reverseGeocode({
        lat: String(latLng[0]),
        lon: String(latLng[1]),
        addressdetails: true
    })
    return result
}
