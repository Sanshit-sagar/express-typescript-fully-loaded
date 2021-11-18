import { Request, Response, NextFunction } from 'express';

type  = (req: Request, res: Response, next: NextFunction) => Promise<void | any>

export default (func: ErrorTriggerer) => {
    return (req: Request, res: Response, next: NextFunction) => {
        func(req, res, next)
        .catch((error) => next(error));
    }
} 