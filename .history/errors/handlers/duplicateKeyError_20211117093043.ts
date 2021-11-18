import { Request, Response, NextFunction } from 'express'

export default ((error, req: Request, res: Response, next: NextFunction) => {
    const field = Object.keys(error.keyValue);
    const statusCode = 409

    res.status(statusCode).send({
        error: `Conflict`,
        message: `A resource with that ${field} already exists`,
        fields: field,
        statusCode
    });
}); 