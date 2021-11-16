import { Request, Response, NextFunction } from "express";


export default ((error, req: Request, res: Response, next: NextFunction) {
    const errorMessage = getErrorMessage(error); 

    logErrorMessage(errorMessage);

    if(response.headersSent) {
        return next(error); 
    }

    
})