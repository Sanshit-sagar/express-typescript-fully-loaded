import { Request, Response, NextFunction } from 'express'
import type { ValidationError } from './index'

export default ((error: ValidationError, req: Request, res: Response, next: NextFunction) => {
     let errorsArr = Object.values(error.errors).map((el) => el.message);
     let fieldsArr = Object.values(error.errors).map((el) => el.path);

     
     let statusCode = 400;

     
    res.status(statusCode).send({
        messages: errors?.length > 1 ? errors.join(' ') : errors,
        fields,
        statusCode,
        error: 'BAD REQUEST'
    });
}); 