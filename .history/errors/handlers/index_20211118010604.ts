import { Request, Response } from 'express'

import logger from '../../lib/logger';

import validationError from "./validationError";
import duplicateKeyError from "./duplicateKeyError";
import internalServerError from './internalServerError';

const handleDuplicateKeyError = (err, res) => {
    const field = Object.keys(err.keyValue);
    const code = 409;
    const error = `An account with that ${field} already exists.`;
    res.status(code).send({messages: error, fields: field});
}

//handle field formatting, empty fields, and mismatched passwords 
const handleValidationError = (err, res) => {
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

//error controller function
((error: any, req: Request, res: Response) => {
    try {
        console.log('congrats you hit the error middleware');
        console.log(err);
        if(err.name === 'ValidationError') return err = handleValidationError(err, res); 
        if(err.code && err.code == 11000) return err = handleDuplicateKeyError(err, res);
    } catch(err) {
        res.status(500).send('An unknown error occured.');
    }
}

const errorHandler = 
    logger.info(`Inside the error handler`)

    res.send(error.statusCode || error.code || 500).json({
        ...error,
        message: error.message || 'Unknown Error'
    }) ; 
}); 


export default errorHandler; 

