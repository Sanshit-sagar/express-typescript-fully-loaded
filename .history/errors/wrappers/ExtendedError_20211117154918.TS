import { clientErrorResponses, serverErrorResponses } from '../httpStatusCodes';
import type { ClientError, ServerError } from '../httpStatusCodes';
import logger from '../../lib/logger';


export type DuplicateKeyErrorProps = {
    keyValue: {
        [key: string]: string
    }; 
}

export type ValidationErrorProps = {
    message: string;
    path: string; 
}[];

class ExtendedError extends Error {
    code: number;
    name: string;
    message: string;
    timestamp: number; 

    constructor(code: number, name: string, message: string) {
        super(message);

        this.code    =  code
        this.name    =  name 
        this.message =  message
        this.timestamp = new Date().getTime(); 
    }
}

class ValidationError extends ExtendedError {
    errors: ValidationErrorProps; 

    constructor(errors: ValidationErrorProps) {
        super(422, 'ValidationError', 'UnprocessableEntity');
        this.errors = [...errors]; 
    }
}

class DuplicateKeyError extends ExtendedError {
    keyValue: DuplicateKeyErrorProps;

    constructor(fieldMap: DuplicateKeyErrorProps) {
        super(409, "DuplicateKeyError", "Conflict"); 
        this.keyValue = fieldMap; 
    }
}

export default ExtendedError;