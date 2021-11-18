import { clientErrorResponses, serverErrorResponses } from '../httpStatusCodes'
import type { IanaHttpStatusCode } from '../httpStatusCodes'

type ErrorWrapperName = ''

class ExtendedError extends Error {
    code: IanaHttpStatusCode;
    type: string;
    name: ErrorWrapperName;
    reason: string; 

    constructor(props: string) {
        super(props);

        this.code = 500;
        this.type = 
    }


}

export default ExtendedError;