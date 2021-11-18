import { Request, Response, NextFunction } from 'express';

type FunctionThatThrows = (
    req: Request, 
    res: Response, 
    next: NextFunction
) => Promise<void | any>


export default (fn: FunctionThatThrows) => {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch((error) => {
            next(error)
        });
    }
} 