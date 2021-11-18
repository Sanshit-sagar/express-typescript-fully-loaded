import { Request, Response, NextFunction } from 'express'

type Dupl

export default ((error, req: Request, res: Response, next: NextFunction) => {
    const field = Object.keys(error.keyValue);
    const statusCode = 409

    res.status(statusCode).send({
        error: `CONFLICT`,
        message: `A resource with that ${field} already exists`,
        fields: field,
        statusCode
    });
}); 