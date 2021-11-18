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

    res.send(error.statusCode || error.code || 500).json({
        ...error,
        message: error.message || 'Unknown Error'
    }) ; 
}); 


export default errorHandler; 

