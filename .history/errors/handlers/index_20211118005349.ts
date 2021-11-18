import { Request, Response } from 'express'

import logger from '../../lib/logger';

import validationError from "./validationError";
import duplicateKeyError from "./duplicateKeyError";
import internalServerError from './internalServerError';

// import ExtendedError from '../wrappers/ExtendedError'
// import ValidationError from '../wrappers/ValidationError'; 
// import DuplicateKeyError from '../wrappers/DuplicateKeyError';
// import InternalServerError from '../wrappers/InternalServerError'; 
// export type CustomError = ExtendedError | ValidationError | DuplicateKeyError | InternalServerError;


const errorHandler = ((error: any, req: Request, res: Response) => {
    logger.info(`Inside the error handler`)

    try {
        
        if(error.name === 'ValidationError') {
            return validationError(error, req, res);
        } else if(error.name === 'DuplicateKeyError' || error.code && error.code == 11000) {
            return duplicateKeyError(error, req, res);
        }
        return internalServerError(error, req, res); 
    } catch (additionalError) {
        return internalServerError(additionalError, req, res); 
    }
}); 


export default errorHandler; 