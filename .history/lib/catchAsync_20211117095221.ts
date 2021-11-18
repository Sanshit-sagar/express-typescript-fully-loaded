import { Request, Response, NextFunction } from 'express';

type AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<void | any>

export default (func: AsyncFunction) => {
    return (req, res, next) => {
        func(req, res, next)
        .catch((err))
    }
} 