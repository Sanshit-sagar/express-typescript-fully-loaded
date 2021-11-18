import httpStatusCodes, { clientErrorResponses, serverErrorResponses } from '../httpStatusCodes'

class ExtendedError extends Error {
    code: number;
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