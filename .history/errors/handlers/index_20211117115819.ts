import { Request, Response, NextFunction } from 'express'

import duplicateKeyError from "./duplicateKeyError";
import validationError from "./validationError";

import logger from '../../lib/logger';

export type DuplicateKeyError = {
    name: 'DuplicateKeyError';
    keyValue: {
        [key: string]: string
    }; 
}

export type ValidationError = {
    name: 'ValidationError'; 
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
        } else if(error.stat && error.code == 11000) {
            return duplicateKeyError(error, req, res, next);
        } else {
            res.send(500).json({ error: 'Unknown error occourec' }); 
        }
    } catch (error) {
        res.send(500).json({ error: 'Unknown error occoured' });
    }
}); 


export default errorHandler; 