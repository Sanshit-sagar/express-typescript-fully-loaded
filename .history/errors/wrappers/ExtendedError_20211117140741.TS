import { clientErrorResponses, serverErrorResponses } from '../httpStatusCodes'
import type { ClientError, ServerError } from '../httpStatusCodes'

type MongoDbErrorCodes = 11000 

interface ExtendedErrorProps {
    code: ClientError | ServerError | MongoDbErrorCodes;
    name: 'DuplicateKeyError' | 'ValidationError' | 'InternalServerError'; 
    type: 'BAD_REQUEST' | 'CONFLICT' | 'INTERNAL_SERVER_ERROR';
};

class ExtendedError extends Error {
    code: Extract<ExtendedErrorProps, "code">; 
    type:  Extract<ExtendedErrorProps, "type">; ;
    name:  Extract<ExtendedErrorProps, "name">; ;
    fields: string | string[]; 
    reason: string;
    

    constructor(props: ExtendedErrorProps) {
        super(props);

        this.code = "500";
        this.name = "InternalServerError";
        this.reason = "Unknown Error";
        this.type = "BAD_REQUEST"; 
    }


}

export default ExtendedError;