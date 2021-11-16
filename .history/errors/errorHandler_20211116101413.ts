import { Request, Response, NextFunction } from "express";

const NODE_ENV = process.env.NODE_END || 'development';

type HttpStatusCode = '100' | '200' | '300' | '400' | '500';

type ExtendedError = { 
    type: string; 
    status?: HttpStatusCode; 
} | { 
    type: string; 
    statusCode?: HttpStatusCode; 
};

type GetHttpStatusCodeProps = {
    error: ExtendedError;
    res: Response;
}

const getErrorMessage = (error: ExtendedError) => {

}

const logErrorMessage = (errorMessage: string) => {

}

const isErrorStatusCode = (statusCode: HttpStatusCode): boolean => {
    let statusCodeNumber = Number(parseInt(String(statusCode)));
    return statusCodeNumber >= 400 && statusCodeNumber <= 600
}

const getHttpStatusCode = ({ error, res }: GetHttpStatusCodeProps): HttpStatusCode => {
    const statusCodeFromError: HttpStatusCode | = error.status || error.statusCode; 
    
    if(isErrorStatusCode(statusCodeFromError)) {
        return statusCodeFromError;
    }

    const statusCodeFromResponse: HttpStatusCode | 

    return code;
}

export default ((error, req: Request, res: Response, next: NextFunction) => {
    const errorMessage = getErrorMessage(error); 

    logErrorMessage(errorMessage);

    if(res.headersSent) {
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