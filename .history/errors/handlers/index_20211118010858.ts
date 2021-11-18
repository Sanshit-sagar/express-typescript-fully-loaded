import { Request, Response } from 'express'

import ExtendedError from '../wrappers/ExtendedError'
import ValidationError  from '../wrappers/ValidationError';
import DuplicateKeyError  from '../wrappers/DuplicateKeyError';
import InternalServerError from '../wrappers/InternalServerError';

const handleDuplicateKeyError = (error: DuplicateKeyError, res: Response) => {
    const code = 409;
    const fields = Object.keys(error.duplicates);
    const message = `An account with that ${fields} already exists.`;

    res.status(code).send({messages: error, fields });
}

//handle field formatting, empty fields, and mismatched passwords 
const handleValidationError = (error: ValidationError, res: Response) => {
    let errors = Object.values(error.errors).map(el => el.message);
    let fields = Object.values(error.errors).map(el => el.path);
    let code = 400;

    if(errors.length > 1) {
        const formattedErrors = errors.join(' ');
        res.status(code).send({messages: formattedErrors, fields: fields});
    } else {
        res.status(code).send({messages: errors, fields: fields})
    }
}

//error controller function
export default ((error: any, req: Request, res: Response) => {
    try {
        console.log('congrats you hit the error middleware');
        console.log(error);
        if(error.name === 'ValidationError') return error = handleValidationError(error, res); 
        if(error.code && error.code == 11000) return error = handleDuplicateKeyError(error, res);
    } catch(err) {
        res.status(500).send('An unknown error occured.');
    }
}
