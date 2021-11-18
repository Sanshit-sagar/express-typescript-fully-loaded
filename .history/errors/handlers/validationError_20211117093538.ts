import errors from 'errors';
import { Request, Response, NextFunction } from 'express'

type ValidationError {
    message: string;
    path: string; 
};

export default ((error, req: Request, res: Response, next: NextFunction) => {
     let errors = Object.values(error.errors).map((el) => el.message);
     let fields = Object.values(error.errors).map((el) => el.path);
     let statusCode = 400;

     
    res.status(statusCode).send({
        messages: errors?.length > 1 ? errors.join(' ') : errors,
        fields,
        statusCode,
        error: 'BAD REQUEST'
    });
}); 
