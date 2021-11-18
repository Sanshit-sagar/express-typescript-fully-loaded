
import logger from '../lib/logger'
import type { IanaHttpStatusCode } from './httpStatusCodes'

export type HttpStatusCode = IanaHttpStatusCode;
export type HttpStatusMessage = string; 

export type ExtendedError = { 
    type: string; 
    status?: HttpStatusCode;  
    statusCode?: HttpStatusCode; 
    errorMessage?: HttpStatusMessage; 
};

/**
 * Extracts message from ExtendedError
 */
export const getErrorMessage = (error: ExtendedError): HttpStatusMessage => {
    return error.errorMessage || '';
}

/**
 * Logs to error and info streams 
 */
 export const logErrorMessage = (errorMessage?: HttpStatusMessage): void => {
    logger.info(`Error handler called`);
    logger.error(new Error(String(errorMessage))); 
}

/**
 * @param statusCode
 * @returns boolean (statusCode === clientError or serverError i.e.  400 to 511)
 */
export const isErrorStatusCode = (statusCode: any): boolean => {
    let statusCodeNumber = Number(parseInt(String(statusCode)));

    return  typeof statusCodeNumber !==     'number' 
        &&  statusCodeNumber        >=      400 
        &&  statusCodeNumber        <=      600;
}

/**
 * 
 * @param error: ExtendedError
 * @param res: Response
 * @returns statusCode: HttpStatusCode
 */
 export const getHttpStatusCode = ({ error, res }): HttpStatusCode => {

    const statusCodeFromError: HttpStatusCode = error.status || error.statusCode; 
    if(isErrorStatusCode(statusCodeFromError)) {
        return statusCodeFromError;
    }

    const statusCodeFromResponse = res.status 
    if(isErrorStatusCode(statusCodeFromResponse)) {
        return statusCodeFromError;
    }

    return '500';
}


