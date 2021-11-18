

import httpStatusCodes from './httpStatusCodes'
import type { IanaHttpStatusCode } from './httpStatusCodes'


export type HttpStatusCode = IanaHttpStatusCode;
export type HttpStatusMessage = string; 

export type ExtendedError = { 
    type: string; 
    status?: HttpStatusCode;  
    statusCode?: HttpStatusCode; 
    errorMessage?: HttpStatusMessage; 
};

export class BadRequestError extends Error {
    statusCode: number;
    data: any;

    constructor(error) {
        super(error.message);
    
        this.data = { error };
        this.statusCode = 400;
    }
}

// import { NativeError } from 'mongoose'
// import { AssertionError } from 'assert'

// app.use(function handleAssertionError(error, req, res, next) {
//     if (error instanceof AssertionError) {
//       return res.status(400).json({
//         type: 'AssertionError',
//         message: error.message
//       });
//     }
//     next(error);
//   });
  
//   app.use(function handleDatabaseError(error, req, res, next) {
//     if (error instanceof MongoError) {
//       return res.status(503).json({
//         type: 'MongoError',
//         message: error.message
//       });
//     }
//     next(error);
//   });

// if(error) {
//     res.locals.isErroneous = true;
//     res.locals.error = error;

//     switch(error?.type) {
//         case 'redirect':
//             res.redirect('/error');
//         case 'time-out':
//             res.status(408).json({ message: 'Request timed out while waiting for response' });
//         case 'conflict':
//             res.status(409).json({ message: 'The provided details are in conflict with those of an existing resource'})
//         case 'teapot':
//             res.status(418).json({ message: 'I am a teapot' })   
//         case 'invalid-params':
//             res.status(422).json({ message: 'Invalid params provided' })
//         default:
//             res.status(500).json({ message: 'Unknown error occoured' })
//     }
// } else if(res.locals) {
//     res.status(200).json({ ...res.locals })
// } else {
//     res.status(404).json({ message: 'Could not understand request' })
// }