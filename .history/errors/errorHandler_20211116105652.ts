import { Request, Response, NextFunction } from "express";

import httpStatusCodes from './httpStatusCodes';
import logger from '../lib/logger';

const NODE_ENV = process.env.NODE_END || 'development';


type HttpCodeMap = typeof httpStatusCodes; 
type HttpStatusCode = keyof HttpCodeMap;
type HttpStatusMessage = HttpCodeMap[keyof HttpCodeMap], 'cause'> | string; 

type ExtendedError = { 
    type: string; 
    status?: HttpStatusCode;  
    statusCode?: HttpStatusCode; 
    errorMessage?: HttpStatusMessage; 
};

type GetHttpStatusCodeProps = {
    error: ExtendedError;
    res: Response;
}

const getErrorMessage = (error: ExtendedError): HttpStatusMessage => {
    return error.errorMessage || '';
}

const logErrorMessage = (errorMessage?: HttpStatusMessage): void => {
    logger.info(`Error handler called`);
    logger.error(new Error(String(errorMessage))); 
}

const isErrorStatusCode = (statusCode: HttpStatusCode | number): boolean => {
    let statusCodeNumber = Number(parseInt(String(statusCode)));
    return statusCodeNumber >= 400 && statusCodeNumber <= 600
}

const getHttpStatusCode = ({ error, res }: GetHttpStatusCodeProps): HttpStatusCode => {

    const statusCodeFromError: HttpStatusCode | number = error.status || error.statusCode; 
    if(isErrorStatusCode(statusCodeFromError)) {
        return statusCodeFromError;
    }

    const statusCodeFromResponse: HttpStatusCode | number = res.statusCode; 
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

    errorMessage = errorMessage || httpStatusCodes[errorResponse.statusCode]; 

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