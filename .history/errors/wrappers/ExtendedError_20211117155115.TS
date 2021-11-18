// import { clientErrorResponses, serverErrorResponses } from '../httpStatusCodes';
// import type { ClientError, ServerError } from '../httpStatusCodes';


export type DuplicateKeyErrorProps = {
    keyValue: {
        [key: string]: string
    }; 
}


class ExtendedError extends Error {
    code: number;
    name: string;
    message: string;
    timestamp: number; 

    constructor(code: number, name: string, message: string) {
        super(message);

        this.code    =  code
        this.name    =  name 
        this.message =  message
        this.timestamp = new Date().getTime(); 
    }
}

export default ExtendedError;