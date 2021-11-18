import { clientErrorResponses, serverErrorResponses } from '../httpStatusCodes'
import type { ClientError, ServerError } from '../httpStatusCodes'


type MongoDbErrorCodes = 11000 

interface ExtendedErrorProps {
    code: ClientError | ServerError | MongoDbErrorCodes;
    name: 'DuplicateKeyError' | 'ValidationError' | 'InternalServerError'; 
    reason: string;
    type: 'BAD_REQUEST' | 'CONFLICT' | 'INTERNAL_SERVER_ERROR';
};

class ExtendedError extends Error {
    code:  
    type: string;
    name: ErrorWrapperName;
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