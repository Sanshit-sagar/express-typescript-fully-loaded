import { clientErrorResponses, serverErrorResponses } from '../httpStatusCodes'
import type { ClientError, ServerError } from '../httpStatusCodes'

type MongoDbErrorCodes = 11000 

interface ExtendedErrorProps {
    code?: ClientError | ServerError | MongoDbErrorCodes;
    name?: 'DuplicateKeyError' | 'ValidationError' | 'InternalServerError'; 
    type?: 'BAD_REQUEST' | 'CONFLICT' | 'INTERNAL_SERVER_ERROR';
    message: string;
}

class ExtendedError extends Error {
    code: Extract<ExtendedErrorProps, "code">; 
    type:  Extract<ExtendedErrorProps, "type">; ;
    name:  Extract<ExtendedErrorProps, "name">; ;
    fields: string | string[]; 
    message: string;
    

    constructor(props: ExtendedErrorProps) {
        super(props.message);

        this.code = props.code || "500";
        this.name = props.name || "InternalServerError";
        this.message = props.message || "Unknown Error";
        this.type = "BAD_REQUEST"; 
    }


}

export default ExtendedError;