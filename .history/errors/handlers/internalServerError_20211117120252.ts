import { Request, Response, NextFunction } from 'express'
import type { CustomError } from './index'

import logger from '../../lib/logger'
import { timestamp } from '../../lib/dayjs/index'

const STATUS_CODE = 500;
const STATUS_NAME = 'INTERNAL_SERVER_ERROR'; 
const STATUS_TYPE = 'Unknown Error';

export default ((error: CustomError, req: Request, res: Response) => {
    const message = error.message || 'An unknown error occurred';

    const validationError = {
        message,
        code: STATUS_CODE,
        type: STATUS_TYPE,
        name:STATUS_NAME,
        timestamp: timestamp()
    };
    
    logger.info(`Validation Error: ${JSON.stringify(validationError)}`)

    res.status(STATUS_CODE).send(validationError);
}); 
