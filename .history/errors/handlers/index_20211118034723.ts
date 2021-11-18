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
        return res.status(code).send({messages: formattedErrors, fields: fields});
    } else {
        return res.status(code).send({messages: errors, fields: fields})
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

const handleUnknownInternaServerError = 

const isValidationError = (error: any): boolean => {
    return error.name === 'ValidationError';
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

//error controller function
export default ((err: any, req: Request, res: Response, next: NextFunction) => {
    try {
        logger.info('congrats you hit the error middleware');
        logger.info(`Error in handler: ${JSON.stringify(err)}`);
        

        if(isValidationError(err))  return err = handleValidationError(err, res); 
        if(isDuplicateKeyError(err)) return err = handleDuplicateKeyError(err, res);
        if(isNotFoundError(err, req)) return err = handleNotFoundError(err, req, res); 

        res.status(err.code || 501).send({ message: 'what an amazing error' });
    } catch(err) {
        res.status(500).send('An unknown error occured.');
    }
}); 