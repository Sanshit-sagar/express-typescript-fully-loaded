import { Request, Response } from 'express'
import ValidationError from '../wrappers/ValidationError'

import { timestamp } from '../../lib/dayjs/index'

const STATUS_CODE = 400;

export default ((error: ValidationError, req: Request, res: Response) => {
    
    const validationError = {
        ...error,
    };

    res.status(STATUS_CODE).send(validationError);
}); 
