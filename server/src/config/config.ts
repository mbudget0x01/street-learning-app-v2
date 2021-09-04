import { apiPort, clientHostName, redisHostName, redisPort, serverIsProxy } from "./environement";
import {config} from "./file"

/**
 * Returns if the client app should be proxied via server
 * @returns true if should proxy
 */
export function getIsProxy():boolean{
    let envVal = serverIsProxy();
    if(envVal !== undefined){
        return envVal;
    }
    return config.isProxy
}

/**
 * Gets the host name or ip of the client app
 * @returns hostname or ip as string
 */
export function getClientHostName():string{
    let envVal = clientHostName();
    if(envVal !== undefined){
        return envVal;
    }
    return config.clientHostName
}

/**
 * The Port to listen on
 * @returns The port the server app should listen
 */
export function getApiPort():number{
    let envVal = apiPort();
    if(envVal !== undefined){
        return envVal;
    }
    return config.apiPort
}

/**
 * Hostname of the redis server
 * @returns redis server host name
 */
export function getRedisHostName():string{
    let envVal = redisHostName();
    if(envVal !== undefined){
        return envVal;
    }
    return config.redisHostName
}

/**
 * Redis Port to bind to
 * @returns the port to bind to.
 */
export function getRedisPort():number{
    let envVal = redisPort();
    if(envVal !== undefined){
        return envVal;
    }
    return config.redisPort
}

/**
 * Logs a config report go give a overview what is configured ;)
 */
export function logSettings():void{
    console.log("App Settings \n--------------");
    //App Settings
    console.log("Port", getApiPort());
    let isProxy = getIsProxy()
    //Proxy Settings
    console.log("Is Proxy", isProxy);
    if(isProxy){
        console.log("Proxied Host", getClientHostName());
    }
    //redis Settings
    console.log("Redis Host", getRedisHostName());
    console.log("Redis Port", getRedisPort());
    console.log("--------------");
}