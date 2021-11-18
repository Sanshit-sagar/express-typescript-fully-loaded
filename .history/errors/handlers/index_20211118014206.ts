import { Request, Response } from 'express'

import ExtendedError from '../wrappers/ExtendedError'
import ValidationError  from '../wrappers/ValidationError';
import DuplicateKeyError  from '../wrappers/DuplicateKeyError';
import InternalServerError from '../wrappers/InternalServerError';
import logger from '../../lib/logger';

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
export default ((error: ValidationError | DuplicateKeyError | ExtendedError, req: Request, res: Response) => {
    logger.info('Inside the error handler');

    try {
       res.status(error.code || 500).json({
           ...error
       });
    } catch(err) {
        res.status(500).send({
            message: 'An unknown error occured.');
    }
}); 

