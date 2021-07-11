export class GeocodeError extends Error {
    private geocodeErrorCause : GeocodeErrorCause
    
    constructor(message: string, cause:GeocodeErrorCause){
        super(message);
        this.geocodeErrorCause = cause;
    }

    public getCause():GeocodeErrorCause{
        return this.geocodeErrorCause
    }
}

type GeocodeErrorCause = 'NotResolvable' | 'NetworkFailure' | 'requestDenied' | 'undefined'