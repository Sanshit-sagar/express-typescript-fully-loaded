import { Request, Response, NextFunction } from 'express';

type AsyncFunction = (req: Request, res: Response, next) => Promise<void | any>

export default (func: AsyncFunction) => {
    return (req, res, next) => {
        func(req, res, next);
    }
} 