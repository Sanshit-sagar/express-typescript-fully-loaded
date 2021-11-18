import { Request, Response } from 'express'
import { timestamp } from '../../lib/dayjs/index'
import { DuplicateKeyError } from ../wrappers/


const STATUS_CODE = 500;
const STATUS_NAME = 'INTERNAL_SERVER_ERROR'; 
const STATUS_TYPE = 'Unknown Error';

export default ((error: DuplicateKeyError | ValidationError, req: Request, res: Response) => {
    const message = error.message || 'An unknown error occurred';

    const unknownError = {
        message,
        code: STATUS_CODE,
        type: STATUS_TYPE,
        name:STATUS_NAME,
        timestamp: timestamp()
    };
    
    res.status(STATUS_CODE).send(unknownError);
}); 
