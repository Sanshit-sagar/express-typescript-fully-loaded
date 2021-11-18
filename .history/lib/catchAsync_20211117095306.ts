import { Request, Response, NextFunction } from 'express';

type ErrorTriggerer = (req: Request, res: Response, next: NextFunction) => Promise<void | any>

export default (func: ErrorTriggerer) => {
    return (req: , res, next) => {
        func(req, res, next)
        .catch((error) => next(error));
    }
} 