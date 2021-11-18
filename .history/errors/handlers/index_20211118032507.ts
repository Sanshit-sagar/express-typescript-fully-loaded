import { Request, Response, NextFunction } from 'express' 
import DuplicateKeyError  from '../wrappers/DuplicateKeyError';
import ValidationError from '../wrappers/ValidationError'; 
import ExtendedError  from '../wrappers/ExtendedError';
import logger  from '../../lib/logger';

//handle email or usename duplicates
const handleDuplicateKeyError = (err: DuplicateKeyError, res) => {
    const field = Object.keys(err.keyValue);
    const code = 409;
    const error = `An account with that ${field} already exists.`;
    return res.status(code).send({messages: error, fields: field});
}

//handle field formatting, empty fields, and mismatched passwords 
const handleValidationError = (err: ValidationError, res) => {
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

const handleNotFoundError = (err, res) => {
    return res.status(404).json({ ...err, message: err.message || 'Resource not found' }); 
}

const isNotFoundError = (error: any, req: Request) => {
    return (
        err.code && err.code === 404  ||
        
    )
}

//error controller function
export default ((err: any, req: Request, res: Response, next: NextFunction) => {
    try {
        logger.info('congrats you hit the error middleware');
        logger.info(`Error in handler: ${JSON.stringify(err)}`);
        logger.info(`Request in handler: ${req.method}`);
        // logger.error(err);

        if(err.name === 'ValidationError') return err = handleValidationError(err, res); 
        if(err.code && err.code == 11000) return err = handleDuplicateKeyError(err, res);
        if(isNotFoundError(err, req)) return err = handleNotFoundError(err, res); 
        res.status(err.code || 501).send({ message: 'what an amazing error' });
    } catch(err) {
        res.status(500).send('An unknown error occured.');
    }
}); 