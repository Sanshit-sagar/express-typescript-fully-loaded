import { Request, Response, NextFunction } from 'express';
import DuplicateKeyError  from '../wrappers/DuplicateKeyError';

const STATUS_CODE = 409;
const STATUS_NAME = 'CONFLICT'; 
const STATUS_TYPE = 'Duplicate Key Error';

const generateMessage = (field: string[]) => `A resource with that ${field[0]} already exists`; 

export default ((error: DuplicateKeyError, req: Request, res: Response) => {
    const validationError = {
        code: STATUS_CODE,
        name: STATUS_NAME,
        fields: Object.entries(error.keyValue),
        message: generateMessage(Object.keys(error.keyValue)),
    };

    res.status(STATUS_CODE).send(validationError);
}); 