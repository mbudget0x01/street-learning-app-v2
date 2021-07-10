export class GeocodeError extends Error {
    geocodeErrorCause : GeocodeErrorCause
    
    constructor(message: string, cause:GeocodeErrorCause){
        super(message);
        this.geocodeErrorCause = cause;
    }
}

type GeocodeErrorCause = 'NotResolvable' | 'NetworkFailure' | 'requestDenied' | 'undefined'