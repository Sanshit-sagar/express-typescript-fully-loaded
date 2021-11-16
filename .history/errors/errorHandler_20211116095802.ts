import { Request, Response, NextFunction } from "express";


export default ((error, req: Request, res: Response, next: NextFunction) {
    const errorMessage = getErrorMessage(error); 

    logErrorMessage(errorMessage);

    if(response.headersSent) {
        return next(error); 
    }

    const errorResponse = {
        statusCode: getHttpStatusCode({ error, res }),
        body: undefined
    };

    if(NODE_ENV !== 'production') {
        errorResponse.body = errorMessage; 
    };

    res.status(errorResponse.statusCode);

    res.format({
        "application/json": () => { // set JSON formatted body, header: ['Content-type']:'application/json' 
            res.json({
                message: errorResponse.body
            })
        },
        "default": () => {  
            res.type("text/plain").send(errorResponse.body)
        }
    });
})



/**
* 1. 
* 2. set plain text formatted body, header: ['Content-type']:'text/plain'
*
*/