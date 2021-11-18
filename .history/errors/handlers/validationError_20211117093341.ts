import errors from 'errors';
import { Request, Response, NextFunction } from 'express'

export default ((error, req: Request, res: Response, next: NextFunction) => {
     let errors = Object.values(error.errors).map((el) => el.message);
     let fields = Object.values(error.errors).map((el) => el.path);
     let code = 400;

     if(errors.length > 1) {
        const formattedErrors = errors.join(' ');
        res.status(code).send({messages: formattedErrors, fields: fields});
    } else {
        res.status(code).send({messages: errors, fields: fields})
    }
} 

res.status(code).send({
    messages: errors?.length > 1 ? errors.join(' ') : errors,
    fields:
})