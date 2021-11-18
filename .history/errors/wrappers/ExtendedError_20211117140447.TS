import { clientErrorResponses, serverErrorResponses } from '../httpStatusCodes'
import type { ClientError, ServerError } from '../httpStatusCodes'

type ErrorWrapperName = 'DuplicateKeyError' | 'ValidationError' | 'InternalServerError'; 

type MongoDbErrorCodes = 11000 

class ExtendedError extends Error {
    code: ClientError | ServerError
    type: string;
    name: ErrorWrapperName;
    reason: string; 

    constructor(props: string) {
        super(props);

        this.code = "500";
        this.name = "InternalServerError";
        this.reason = "Unknown Error";
        this.type = "BAD_REQUEST"; 
    }


}

export default ExtendedError;