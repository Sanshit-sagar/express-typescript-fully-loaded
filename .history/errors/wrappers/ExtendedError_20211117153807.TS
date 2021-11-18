import { clientErrorResponses, serverErrorResponses } from '../httpStatusCodes';
import type { ClientError, ServerError } from '../httpStatusCodes';
import logger from '../../lib/logger';

type MongoDbErrorCodes = 11000 

// type ExtendedErrorName = 'DuplicateKeyError' | 'ValidationError' | 'InternalServerError';
// type ExtendedErrorType = 'BAD_REQUEST' | 'CONFLICT' | 'INTERNAL_SERVER_ERROR';
// type ExtendedErrorCode = ClientError | ServerError | MongoDbErrorCodes;

type ExtendedErrorProps =  {
    code: number | string; 
    name: string;  
    type: string; 
    message: string;
    stack?: string; 
    fields?: string[]; 
};

class ExtendedError extends Error {
    code: number | string | undefined;
  
    name: string | undefined;
    message: string | undefined;
    fields: string | string[] | undefined; 
    stack: string| undefined; 
    timestamp: number | undefined;
    // TODO: include path, method and location as well


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
        logger.info(`Error: ${this.code} ${this.type} ${this.name} ${this.message} ${this.timestamp}`);
    }
}

export default ExtendedError;