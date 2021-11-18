import { Request, Response, NextFunction } from 'express'
import duplicateKeyError from "./duplicateKeyError";
import validationError from "./validationError";

type DuplicateKeyErrorStack = {
    name: 'DuplicateKeyError';
    keyValue: {
        [key: string]: string
    }; 
}

type ValidationErrorStack = {
    name: 'ValidationError'; 
    errors: {
        message: string;
        path: string; 
    }[]; 
}

type CustomError = DuplicateKeyErrorStack | ValidationErrorStack; 

export default ((error: CustomError, req: Request, res: Response, next: NextFunction) => {
    try {
        switch(error.name) {
            case 'ValidationError':
                return error = validationError(error, req, res, next);
            case 'DuplicateKeyError': 
                return error = duplicateKeyError(error, req, res, next);
            default:
                res.send(500).json({ error: 'Unknown error occourec' }); 
        }
    } catch (error) {
        res.send(500).json({ error: 'Unknown error occoured' });
    }
})