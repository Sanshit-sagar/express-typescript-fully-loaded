// import { clientErrorResponses, serverErrorResponses } from '../httpStatusCodes';
// import type { ClientError, ServerError } from '../httpStatusCodes';

class ExtendedError extends Error {
    code: number;
    message: string;
    timestamp: number; 
    isOperational: boolean;

    constructor(code: number, message: string) {
        super(message);

        this.code    =  code
        this.message =  message
        this.timestamp = new Date().getTime(); 
        Error.captureStackTrace(this, this.constructor); 
    }
}

export default ExtendedError;

class AppError extends Error {
    constructor(message, code) {
    super(message) // bult-in param for Error object 
        console.log('this is the appError');
        this.code = code;
        //detect HTTP status code by first digit of error code // do you need a status for errors? 
        //this.status = code.startsWith('4') ? 'fail' : 'error'; 
        this.isOperational = true;
        
    }
}
