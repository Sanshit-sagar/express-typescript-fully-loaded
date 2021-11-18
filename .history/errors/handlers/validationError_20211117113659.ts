import { Request, Response, NextFunction } from 'express'
import type { ValidationError } from './index'

const STATUS_CODE = 400;
const STATUS_MESSAGE =  'BAD_REQUEST'

export default ((error: ValidationError, req: Request, res: Response, next: NextFunction) => {
    let errorsArr = Object.values(error.errors).map((el) => el.message);
    let fieldsArr = Object.values(error.errors).map((el) => el.path);

    if(errorsArr?.length > 1) 

    let errors =  ? errorsArr.join(', ') : (errorsArr.length ? errorsArr[0] : '');
    let fields = fieldsArr?.length > 1 ? fieldsArr.join(', ') : (fieldsArr.length ? fieldsArr[0] : '');
    
    
    res.status(STATUS_CODE).send({
        messages: errors,
        fields,
        statusCode: STATUS_CODE,
        error:STATUS_MESSAGE
    });
}); 
