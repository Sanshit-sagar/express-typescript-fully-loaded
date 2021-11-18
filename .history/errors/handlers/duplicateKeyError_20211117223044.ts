import { Request, Response, NextFunction } from 'express';
import DuplicateKeyError  from '../wrappers/DuplicateKeyError';
import { timestamp } from '../../lib/dayjs/index';

const STATUS_CODE = 409;
const STATUS_NAME = 'CONFLICT'; 
const STATUS_TYPE = 'Duplicate Key Error';

const generateMessage = (field: string[]) => `A resource with that ${field[0]} already exists`; 

export default ((error: DuplicateKeyError, req: Request, res: Response) => {
    const validationError = {
        message: generateMessage(Object.keys(error.keyValue)),
        fields: Object.entries(error.keyValue),
        code: STATUS_CODE,
        name:STATUS_NAME,
        timestamp: timestamp()
    };

    res.status(STATUS_CODE).send(validationError);
}); 