import { Request, Response, NextFunction } from "express";

import httpStatusCodes from './httpStatusCodes';


import {
    getErrorMessage,
    logErrorMessage,
    getHttpStatusCode
} from './helpers'

const NODE_ENV = process.env.NODE_END || 'development';

export default ((error, req: Request, res: Response, next: NextFunction) => {
    let errorMessage = getErrorMessage(error); 

    logErrorMessage(errorMessage);

    if(res.headersSent) {
        return next(error); 
    }

    const errorResponse = {
        statusCode: getHttpStatusCode({ error, res }),
        body: undefined
    };

    errorMessage = errorMessage || httpStatusCodes[errorResponse.statusCode].message; 

    if(NODE_ENV !== 'production') {
        errorResponse.body = errorMessage 
    };

    res.status(Number(parseInt(errorResponse.statusCode)));

    res.format({
        "application/json": () => { 
            res.json({
                message: errorResponse.body
            })
        },
        "default": () => {  
            res.type("text/plain").send(errorResponse.body)
        }
    });

    next(); 
})



/**
* 1. set JSON formatted body, header: ['Content-type']:'application/json' 
* 2. set plain text formatted body, header: ['Content-type']:'text/plain' [default]
* 3. 
*/