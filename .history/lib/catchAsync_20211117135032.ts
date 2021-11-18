import { Request, Response, NextFunction } from 'express';

type FunctionThatThrows = (req: Request, res: Response, next: NextFunction) => Promise<void | any>

export default (erroneousThenable: FunctionThatThrows) => {
    return (req: Request, res: Response, next: NextFunction) => {
        trigger(req, res, next)
        .catch((error) => {
            next(error)
        });
    }
} 