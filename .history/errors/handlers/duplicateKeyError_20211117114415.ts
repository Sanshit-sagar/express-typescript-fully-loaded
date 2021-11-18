import { Request, Response, NextFunction } from 'express'
import { DuplicateKeyError } from './index'

const STATUS_CODE = 409;
const STATUS_NAME = 'CONFLICT'; 
const STATUS_TYPE = 'D Error';

export default ((error: DuplicateKeyError, req: Request, res: Response, next: NextFunction) => {
    const field = Object.keys(error.keyValue);
    const statusCode = 409

    const validationError = {
        message: errors,
        fields,
        code: STATUS_CODE,
        type: STATUS_TYPE,
        name:STATUS_NAME,
        timestamp: timestamp()
    };

    res.status(statusCode).send({
        error: `CONFLICT`,
        message: `A resource with that ${field} already exists`,
        fields: field,
        statusCode
    });
}); 