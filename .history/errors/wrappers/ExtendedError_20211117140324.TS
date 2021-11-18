import { clientErrorResponses, serverErrorResponses } from '../httpStatusCodes'
import type { ClientError, ServerError } from '../httpStatusCodes'

type ErrorWrapperName = 'DuplicateKeyError' | 'ValidationError' | 'InternalServerError'; 

class ExtendedError extends Error {
    code: ClientError | ServerError;
    type: string;
    name: ErrorWrapperName;
    reason: string; 

    constructor(props: string) {
        super(props);

        this.code = "500";
        this.type = "InternalServerError"
    }


}

export default ExtendedError;