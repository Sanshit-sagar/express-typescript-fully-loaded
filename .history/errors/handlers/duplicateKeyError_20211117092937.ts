import { Request, Response, NextFunction } from 'express'

export default ((error, req: Request, res: Response, next: NextFunction) => {
    const field = Object.keys(error.keyValue);
  
    res.status(code).send({
        message: `A resource with that ${field} already exists`,
        fields: field,
        code: 409
    })
})