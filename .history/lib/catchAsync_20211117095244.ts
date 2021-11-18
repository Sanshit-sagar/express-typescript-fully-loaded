import { Request, Response, NextFunction } from 'express';

type AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<void | any>

export default (func: Er) => {
    return (req, res, next) => {
        func(req, res, next)
        .catch((error) => next(error));
    }
} 