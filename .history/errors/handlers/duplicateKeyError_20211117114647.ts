import { Request, Response, NextFunction } from 'express';
import { DuplicateKeyError } from './index';
import { timestamp } from '../../lib/dayjs/index';

const STATUS_CODE = 409;
const STATUS_NAME = 'CONFLICT'; 
const STATUS_TYPE = 'Duplicate Key Error';

const generateMessage = (field: string) => `A resource with that ${field[0]} already exists`; 

export default ((error: DuplicateKeyError, req: Request, res: Response, next: NextFunction) => {
    const field = Object.keys(error.keyValue);

    const validationError = {
        message: generateMessage(field),
        fields: field,
        code: STATUS_CODE,
        type: STATUS_TYPE,
        name:STATUS_NAME,
        timestamp: timestamp()
    };

    res.status(STATUS_CODE).send(validationError);
}); 