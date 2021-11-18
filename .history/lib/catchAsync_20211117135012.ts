import { Request, Response, NextFunction } from 'express';

type FunctionThatThrows = (req: Request, res: Response, next: NextFunction) => Promise<void | any>

export default (functi: FunctionThatThrows) => {
    return (req: Request, res: Response, next: NextFunction) => {
        func(req, res, next)
        .catch((error) => {
            next(error)
        });
    }
} 