import { Request, Response } from 'express'

import logger from '../../lib/logger';

import validationError from "./validationError";
import duplicateKeyError from "./duplicateKeyError";
import internalServerError from './internalServerError';
import ExtendedError from '../wrappers/ExtendedError'

import DuplicateKeyError from '../wrappers/DuplicateKeyError';
import ValidationError from '../wrappers/ValidationError'; 

export type CustomError = 

const errorHandler = ((error: CustomError, req: Request, res: Response) => {
    logger.info(`Error ${error.name} on ${req.method} ${req.path}`);
    logger.error(new Error(`Error ${error.name} on  ${req.method} ${req.path}`));

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