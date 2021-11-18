import { Request, Response } from 'express'

import ExtendedError from '../wrappers/ExtendedError'
import ValidationError  from '../wrappers/ValidationError';
import DuplicateKeyError  from '../wrappers/DuplicateKeyError';
import InternalServerError from '../wrappers/InternalServerError';
import logger from 'lib/logger';

const handleDuplicateKeyError = (error: DuplicateKeyError, res: Response) => {
    const code = 409;
    const fields = Object.keys(error.duplicates);
    const messages = `An account with that ${fields} already exists.`;

    res.status(code).send({ messages, fields });
}

//handle field formatting, empty fields, and mismatched passwords 
const handleValidationError = (error: ValidationError, res: Response) => {
    let code = 400;
    let errors = Object.values(error.errors).map(el => el.message);
    let fields = Object.values(error.errors).map(el => el.path);

    if(errors.length > 1) {
        const formattedErrors = errors.join(' ');
        res.status(code).send({messages: formattedErrors, fields: fields});
    } else {
        res.status(code).send({messages: errors, fields: fields})
    }
}

//error controller function
export default ((error: any, req: Request, res: Response) => {
    logger.info('I')
    try {
        console.log('congrats you hit the error middleware');
        console.log(error);
        if(error.name === 'ValidationError' || error.code === 400) {
            console.log('In here, about to log a validation error');
            return error = handleValidationError(error, res); 
        }
        if(error.code && error.code == 11000) return error = handleDuplicateKeyError(error, res);
    } catch(err) {
        res.status(500).send('An unknown error occured.');
    }
}); 

