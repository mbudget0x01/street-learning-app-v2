/**
 * An Error representing a filure in geocoding
 */
export class GeocodeError extends Error {
    private geocodeErrorCause : GeocodeErrorCause
    
    constructor(message: string, cause:GeocodeErrorCause){
        super(message);
        this.geocodeErrorCause = cause;
    }

    /**
     * Get the cause of the error
     * @returns The GeocodeErrorCause
     */
    public getCause():GeocodeErrorCause{
        return this.geocodeErrorCause
    }
}

/**
 * Error Causes to be able to distinguishe the error in readable way
 */
type GeocodeErrorCause = 'NotResolvable' | 'NetworkFailure' | 'requestDenied' | 'undefined'