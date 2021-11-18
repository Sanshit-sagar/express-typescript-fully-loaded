// import { clientErrorResponses, serverErrorResponses } from '../httpStatusCodes';
// import type { ClientError, ServerError } from '../httpStatusCodes';

class ExtendedError extends Error {
    code: number;
    message: string;
    name: string;
    timestamp: number; 
    isOperational: boolean;

    constructor(code: number, message: string, name?: string = 'Unnamed Error') {
        super(message);

        this.code    =  code
        this.message =  message
        this.name   = name;
        this.timestamp = new Date().getTime(); 
        this.isOperational = true; 
        Error.captureStackTrace(this, this.constructor); 
    }
}

export default ExtendedError;

