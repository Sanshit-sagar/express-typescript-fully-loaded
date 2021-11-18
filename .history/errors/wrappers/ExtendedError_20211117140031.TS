import { clientErrorResponses, serverErrorResponses } from '../httpStatusCodes'
import type { IanaHttpStatusCode } from '../httpStatusCodes'

class ExtendedError extends Error {
    code: IanaHttpStatusCode;
    type: string;
    name: string;
    reason: string; 

    constructor(props: string) {
        super(props);

        this.code = 500;
        this.type = 
    }


}

export default ExtendedError;