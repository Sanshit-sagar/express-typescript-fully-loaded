import { Request, Response } from 'express'

import logger from '../../lib/logger';

import validationError from "./validationError";
import duplicateKeyError from "./duplicateKeyError";
import internalServerError from './internalServerError';

export type DuplicateKeyError = {
    name: 'DuplicateKeyError';
    code?: number; 
    message?: string; 
    keyValue: {
        [key: string]: string
    }; 
}

export type ValidationError = {
    name: 'ValidationError'; 
    code?: number; 
    message?: string; 
    errors: {
        message: string;
        path: string; 
    }[]; 
}

export type CustomError = DuplicateKeyError | ValidationError; 

const errorHandler = ((error: CustomError, req: Request, res: Response) => {
    logger.info(`Error ${error.name} on ${req.method} ${req.path}`);
    logger.error(new Error(`Error ${error.name} on  ${req.method} ${req.path}`));

    try {
        
        if(error.name === 'ValidationError')  return validationError(error, req, res);
        if(error.code && error.code == 11000) return duplicateKeyError(error, req, res);
        
        return internalServerError(error, req, res); 
    } catch (error) {
        return internalServerError(error, req, res); 
    }
}); 


export default errorHandler; 