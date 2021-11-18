import { Request, Response, NextFunction } from 'express'
import type { ValidationError } from './index'

import logger from '../../lib/logger'
import { timestamp } from '../../lib/dayjs/index'

const STATUS_CODE = 400;
const STATUS_NAME = 'BAD_REQUEST'; 
const STATUS_TYPE = 'Validation Error';

export default ((error: ValidationError, req: Request, res: Response, next: NextFunction) => {
   
    
    const validationError = {
        message: errors,
        fields,
        code: STATUS_CODE,
        type: STATUS_TYPE,
        name:STATUS_NAME,
        timestamp: timestamp()
    };
    
    logger.info(`Validation Error: ${JSON.stringify(validationError)}`)

    res.status(STATUS_CODE).send(validationError);
}); 
