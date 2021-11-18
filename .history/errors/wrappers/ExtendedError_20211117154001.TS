import { clientErrorResponses, serverErrorResponses } from '../httpStatusCodes';
import type { ClientError, ServerError } from '../httpStatusCodes';
import logger from '../../lib/logger';

type MongoDbErrorCodes = 11000 

// type ExtendedErrorName = 'DuplicateKeyError' | 'ValidationError' | 'InternalServerError';
// type ExtendedErrorType = 'BAD_REQUEST' | 'CONFLICT' | 'INTERNAL_SERVER_ERROR';
// type ExtendedErrorCode = ClientError | ServerError | MongoDbErrorCodes;

interface ExtendedErrorProps {
    code: number | string; 
    name: string;  
    message: string;
    type?: string; 
    stack?: string; 
    fields?: string[]; 
};


interface DuplicateKeyError  {
    name: 'DuplicateKeyError';
    code?: 'number'; 
    message?: string; 
    keyValue: {
        [key: string]: string
    }; 
}

export type ValidationError = {
    name: 'ValidationError'; 
    code?: number; 
    message?: string; 
    errors: {
        message: string;
        path: string; 
    }[]; 
}

class ExtendedError extends Error {
    code: number | string | undefined;
    name: string | undefined;
    message: string | undefined;
    fields: string | string[] | undefined; 
    stack: string| undefined; 
    timestamp: number | undefined;

    constructor(props: ExtendedErrorProps) {
        super(props.message);

        this.code    =  props.code
        this.name    =  props.name 
        this.message =  props.message

        this.stack   =  props.stack || ""; 
        this.timestamp = new Date().getTime(); 
    }

    log = (message: string) => {
        this.message += ` ${message}.`; 
        this.timestamp = new Date().getTime(); 
        logger.info(`Error: ${this.code} ${this.name} ${this.message} ${this.timestamp}`);
    }
}

export default ExtendedError;