import { Request, Response, NextFunction } from 'express'
import { DuplicateKeyError } from './index'
import { timestamp } from '../lib/dayjs/timestamp'

const STATUS_CODE = 409;
const STATUS_NAME = 'CONFLICT'; 
const STATUS_TYPE = 'Duplicate Key Error';

export default ((error: DuplicateKeyError, req: Request, res: Response, next: NextFunction) => {
    const field = Object.keys(error.keyValue);

    const validationError = {
        message: `A resource with that ${field} already exists`,
        fields: field,
        code: STATUS_CODE,
        type: STATUS_TYPE,
        name:STATUS_NAME,
        timestamp: timestamp()
    };

    res.status(statusCode).send({
        error: `CONFLICT`,
        message: ,
        fields: field,
        statusCode
    });
}); 