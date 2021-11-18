import { Request, Response, NextFunction } from 'express'

import duplicateKeyError from "./duplicateKeyError";
import validationError from "./validationError";

import logger from '../../lib/logger';
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

const errorHandler = ((error: CustomError, req: Request, res: Response, next: NextFunction) => {
    logger.info(`Error ${error.name} on ${req.method} ${req.path}`);
    logger.error(new Error(`Error ${error.name} on  ${req.method} ${req.path}`));

    try {
        if(error.name === 'ValidationError') {
            return validationError(error, req, res, next);
        } else if(error.code && error.code == 11000) {
            return duplicateKeyError(error, req, res, next);
        } else {
            return internalServerError(error, req, res); 
        }
    } catch (error) {
        res.send(500).json({ error: 'Unknown error occoured' });
    }
}); 


export default errorHandler; 