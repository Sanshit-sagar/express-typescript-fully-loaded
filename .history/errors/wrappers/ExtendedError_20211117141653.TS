import { clientErrorResponses, serverErrorResponses } from '../httpStatusCodes';
import type { ClientError, ServerError } from '../httpStatusCodes';
import logger from '../../lib/logger';

type MongoDbErrorCodes = 11000 

interface ExtendedErrorProps {
    code?: ClientError | ServerError | MongoDbErrorCodes;
    name?: 'DuplicateKeyError' | 'ValidationError' | 'InternalServerError'; 
    type?: 'BAD_REQUEST' | 'CONFLICT' | 'INTERNAL_SERVER_ERROR';
    message?: string;
    stack?: string; 
}

class ExtendedError extends Error {
    code: number | string | undefined;
    type: string | undefined;
    name: string | undefined;
    message: string | undefined;
    fields: string | string[] | undefined; 
    stack: string| undefined; 
    timestamp: Date | undefined;
    // TODO: include path, method and location as well


    constructor(props: ExtendedErrorProps) {
        super(props.message);

        this.code    =  props.code || "500";
        this.name    =  props.name || "InternalServerError";
        this.type    =  props.type ||  "BAD_REQUEST"; 
        this.stack   =  props.stack || ""; 
        this.message =  props.message || "Unknown Error";
        this.timestamp = new Date(); 
    }

    log: (message: string) => {
        logger.info(: any`Error: ${code: any} ${type} ${name} ${message}`)
    }
}

export default ExtendedError;