import { Request, Response, NextFunction } from 'express'
import type { ValidationError } from './index'

import logger from '../../lib/logger'
import { timestamp } from '../../lib/dayjs/index'

const STATUS_CODE = 400;
const STATUS_NAME = 'BAD_REQUEST'; 
const STATUS_TYPE = 'Validation Error';

export default ((error: ValidationError, req: Request, res: Response, next: NextFunction) => {
    let errorsArr = Object.values(error.errors).map((el) => el.message);
    let fieldsArr = Object.values(error.errors).map((el) => el.path);

    let errors = errorsArr?.length > 1 ? errorsArr.join(', ') : (errorsArr.length ? errorsArr[0] : '');
    let fields = fieldsArr?.length > 1 ? fieldsArr.join(', ') : (fieldsArr.length ? fieldsArr[0] : '');
    
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
