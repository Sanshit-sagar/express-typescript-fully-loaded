import { Request, Response, NextFunction } from 'express'
import duplicateKeyError from "./duplicateKeyError";
import validationError from "./validationError";

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

type CustomError = DuplicateKeyError | ValidationError; 

export default ((error: CustomError, req: Request, res: Response, next: NextFunction) => {
    try {
        switch(error.name) {
            case 'ValidationError':
                return validationError(error, req, res, next);
            case 'DuplicateKeyError': 
                return duplicateKeyError(error, req, res, next);
            default:
                res.send(500).json({ error: 'Unknown error occourec' }); 
        }
    } catch (error) {
        res.send(500).json({ error: 'Unknown error occoured' });
    }
})