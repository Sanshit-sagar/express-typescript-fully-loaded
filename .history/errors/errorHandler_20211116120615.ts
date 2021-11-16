import { Request, Response, NextFunction } from "express";

import logger from '../lib/logger';
import httpStatusCodes from './httpStatusCodes';

import type { 
    ExtendedError, 
    HttpStatusCode, 
    HttpStatusMessage, 
    GetHttpStatusCodeProps 
} from './httpStatusCodes'


const NODE_ENV = process.env.NODE_END || 'development';

/**
 * 
 */
const getErrorMessage = (error: ExtendedError): HttpStatusMessage => {
    return error.errorMessage || '';
}

/**
 * 
 */
const logErrorMessage = (errorMessage?: HttpStatusMessage): void => {
    logger.info(`Error handler called`);
    logger.error(new Error(String(errorMessage))); 
}

/**
 * @param statusCode
 * @returns boolean (statusCode === clientError or serverError i.e. b/w 400 - 511)
 */
const isErrorStatusCode = (statusCode: HttpStatusCode): boolean => {
    let statusCodeNumber = Number(parseInt(String(statusCode)));
    return statusCodeNumber >= 400 && statusCodeNumber <= 600
}

/**
 * 
 * @param error: ExtendedError
 * @param res: Response
 * @returns statusCode: HttpStatusCode
 */
const getHttpStatusCode = ({ error, res }: GetHttpStatusCodeProps): HttpStatusCode => {

    const statusCodeFromError: HttpStatusCode = error.status || error.statusCode; 
    if(isErrorStatusCode(statusCodeFromError)) {
        return statusCodeFromError;
    }

    const statusCodeFromResponse: HttpStatusCode = res.status || res.statusCode
    if(isErrorStatusCode(statusCodeFromResponse)) {
        return statusCodeFromError;
    }

    return '500';
}

export default ((error, req: Request, res: Response, next: NextFunction) => {
    let errorMessage: HttpStatusMessage = getErrorMessage(error); 

    logErrorMessage(errorMessage);

    if(res.headersSent) {
        return next(error); 
    }

    const errorResponse = {
        statusCode: getHttpStatusCode({ error, res }),
        body: undefined
    };

    errorMessage = errorMessage || httpStatusCodes[errorResponse.statusCode].message; 

    if(NODE_ENV !== 'production') {
        errorResponse.body = errorMessage 
    };

    res.status(Number(parseInt(errorResponse.statusCode)));

    res.format({
        "application/json": () => { 
            res.json({
                message: errorResponse.body
            })
        },
        "default": () => {  
            res.type("text/plain").send(errorResponse.body)
        }
    });

    next(); 
})



/**
* 1. set JSON formatted body, header: ['Content-type']:'application/json' 
* 2. set plain text formatted body, header: ['Content-type']:'text/plain' [default]
* 3. 
*/