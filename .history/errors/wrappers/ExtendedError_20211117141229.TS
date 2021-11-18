import { clientErrorResponses, serverErrorResponses } from '../httpStatusCodes'
import type { ClientError, ServerError } from '../httpStatusCodes'

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

    constructor(props: ExtendedErrorProps) {
        super(props.message);

        this.code   = props.code || "500";
        this.name    = props.name || "InternalServerError";
        this.type    = props.type ||  "BAD_REQUEST"; 
        this.message = props.message || "Unknown Error";
        this.stack = props.stack || ""; 

    }


}

export default ExtendedError;