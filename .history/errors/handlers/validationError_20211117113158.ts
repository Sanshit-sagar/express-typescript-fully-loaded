import { Request, Response, NextFunction } from 'express'
import type { ValidationError } from './index'

export default ((error: ValidationError, req: Request, res: Response, next: NextFunction) => {
     let errorsArr = Object.values(error.errors).map((el) => el.message);
     let fieldsArr = Object.values(error.errors).map((el) => el.path);

     let field

     let statusCode = 400;
     
    res.status(statusCode).send({
        messages: errorsArr?.length > 1 ? errorsArr.join(', ') : (errorsArr.length ? errorsArr[0] : ''),
        fields: ,
        statusCode,
        error: 'BAD REQUEST'
    });
}); 
