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
    res.status(code).send({messages: error, fields: field});
}

//handle field formatting, empty fields, and mismatched passwords 
const handleValidationError = (err: ValidationError, res) => {
    let errors = Object.values(err.errors).map(el => el.message);
    let fields = Object.values(err.errors).map(el => el.path);
    let code = 400;

    if(errors.length > 1) {
        const formattedErrors = errors.join(' ');
        res.status(code).send({messages: formattedErrors, fields: fields});
    } else {
        res.status(code).send({messages: errors, fields: fields})
    }
}

const handleNotFoundError = (err, res) => {

    if(err.message) {
        res.status(404)
    }
}

//error controller function
export default ((err: any, req: Request, res: Response, next: NextFunction) => {
    try {
        logger.info('congrats you hit the error middleware');
        // logger.error(err);

        if(err.name === 'ValidationError') return err = handleValidationError(err, res); 
        if(err.code && err.code == 11000) return err = handleDuplicateKeyError(err, res);
        if(err.code === 404) return err = handleNotFoundError(err, res); 
        res.status(err.code).send({ message: 'what an amazing error' });
    } catch(err) {
        res.status(500).send('An unknown error occured.');
    }
}); 