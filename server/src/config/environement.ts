/**
 * Readys IS_PROXY env variable 
 * @returns boolean value of variable if set else undefined
 */
export function serverIsProxy(): boolean | undefined {
    let rawValue = process.env.IS_PROXY || undefined;
    if(rawValue === undefined){
        return undefined;
    }
    return boolStringToBool(rawValue);
}

/**
 * Readys PROXY_HOST env variable 
 * @returns String value of variable if set else undefined
 */
export function clientHostName(): string | undefined {
    return process.env.PROXY_HOST || undefined;
}

/**
 * Readys APP_PORT env variable 
 * @returns Number value of variable if set else undefined
 */
export function apiPort(): number | undefined {
    return Number(process.env.APP_PORT) || undefined;
}

/**
 * Readys REDIS_HOST env variable 
 * @returns String value of variable if set else undefined
 */
export function redisHostName(): string | undefined {
    return process.env.REDIS_HOST || undefined;
}

/**
 * Readys REDIS_PORT env variable 
 * @returns Number value of variable if set else undefined
 */
export function redisPort(): number | undefined {
    return Number(process.env.REDIS_PORT) || undefined;
}

/**
 * Helper function to parse env variable boolean values
 * @param configString string boolean Value
 * @returns boolean value of String
 */
function boolStringToBool(configString: string):boolean {
    switch (configString.toLowerCase()) {
        case "false":
        case "no":
        case "wrong":
            return false
    }
    return true
}