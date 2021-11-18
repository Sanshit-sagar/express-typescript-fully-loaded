import { Request, Response } from 'express'
import ValidationError from '../wrappers/ValidationError'

import { timestamp } from '../../lib/dayjs/index'

const STATUS_CODE = 400;
const STATUS_NAME = 'BAD_REQUEST'; 
const STATUS_TYPE = 'Validation Error';

export default ((error: ValidationError, req: Request, res: Response) => {
    
    const validationError = {
        code: STATUS_CODE,
        message: STATUS_TYPE,
        name:STATUS_NAME,
    };

    res.status(STATUS_CODE).send(validationError);
}); 
