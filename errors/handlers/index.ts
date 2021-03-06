import { Request, Response, NextFunction } from 'express' 
import DuplicateKeyError  from '../wrappers/DuplicateKeyError';
import ValidationError from '../wrappers/ValidationError'; 
import ExtendedError  from '../wrappers/ExtendedError';
import NotFoundError from '../wrappers/NotFoundError';

import logger  from '../../lib/logger';

//handle email or usename duplicates
const handleDuplicateKeyError = (err: DuplicateKeyError, res: Response) => {
    const field = Object.keys(err.keyValue);
    const code = 409;
    const error = `An account with that ${field} already exists.`;
    return res.status(code).send({messages: error, fields: field});
}


//handle field formatting, empty fields, and mismatched passwords 
const handleValidationError = (err: ValidationError, res: Response) => {
    let errors = Object.values(err.errors).map(el => el.message);
    let fields = Object.values(err.errors).map(el => el.path);
    let code = 400;

    if(errors.length > 1) {
        const formattedErrors = errors.join(' ');
        return res.status(code).send({ messages: formattedErrors, fields: fields});
    } else {
        return res.status(code).send({ messages: errors, fields: fields})
    }
}

const handleNotFoundError = (err: NotFoundError, req: Request, res: Response) => {
    let resourceKind = err.kind
    let resourceId = err.value 

    return res.status(404).json({ 
        message: 'Not found error',
        resource: req.path,
        method: req.method,
        resourceId,
        resourceKind
    }); 
}

const handleUnknownServerError = (err: any, req: Request, res: Response) => {
    return res.status(500).json({ message: 'An unknown error occured.' });
}

const isValidationError = (error: any): boolean => {
    return error.name === 'ValidationError' && (error.code  && error.code === 400); 
}

const isDuplicateKeyError = (error: any): boolean => {
    return error.code && error.code == 11000; 
}

const isNotFoundError = (error: any, req: Request): boolean => {
    return (
        (error.code && error.code === 404) || 
        (error.kind && error.kind === "ObjectId" && req.method==='GET')
    ) ? true : false;
}

const isUnprocessableEntity = (error: any) => {
    return error.name === "Unprocessable Entity"; 
}

const handleUnprocessableEntityError = (err, res) => {
    return res.status(409).json({ message: err.message || "yeyeye" })
}

export default ((err: any, req: Request, res: Response, next: NextFunction) => {
    try {
        logger.info('congrats you hit the error middleware');
        logger.info(`Error in handler: ${JSON.stringify(err)}`);

        if      (isUnprocessableEntity(err)) return err = handleUnprocessableEntityError(err, res)
        else if (isValidationError(err))     return err = handleValidationError(err, res); 
        else if (isDuplicateKeyError(err))   return err = handleDuplicateKeyError(err, res);
        else if (isNotFoundError(err, req))  return err = handleNotFoundError(err, req, res); 
        else return err = handleUnknownServerError(err, req, res); 
    } catch(err) {
        return err = handleUnknownServerError(err, req, res); 
    }
}); 


// type ValidationFailureItem = {
//     name: "ValidationError" | "ValidatorError";
//     message: string;
//     properties: {
//         message: string;
//         type: string; // "minLength" | "maxLength" | "required" | "unique" 
//         path: string; // "password" | "email"
//         value: string;
//     };
//     kind: string; // "user defined"
//     path: string;
//     value: string; 
// }; 

// type SchemaValidationError = {
//     errors: { [key: string]: ValidationFailureItem }[]; 
//     name: string;     // "ValidationError"
//     _message: string; // `User validation failed: ${FieldName}`
//     message: string; // this._message + errors[i].message
// };