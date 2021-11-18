import { Request, Response, NextFunction } from 'express'
import type { ValidationError } from './index'

export default ((error: ValidationError, req: Request, res: Response, next: NextFunction) => {
    let errorsArr = Object.values(error.errors).map((el) => el.message);
    let fieldsArr = Object.values(error.errors).map((el) => el.path);

    let errors = errorsArr?.length > 1 ? errorsArr.join(', ') : (errorsArr.length ? errorsArr[0] : '');
    let fields = fieldsArr?.length > 1 ? fieldsArr.join(', ') : (fieldsArr.length ? fieldsArr[0] : '');
    errors = errors.substring(0, errors.length - 1)
    
     let statusCode = 400;
     
    res.status(statusCode).send({
        messages: ,
        fields: ,
        statusCode,
        error: 'BAD REQUEST'
    });
}); 
