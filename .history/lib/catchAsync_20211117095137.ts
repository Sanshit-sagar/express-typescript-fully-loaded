import { Request, Response, NextFunction } from 'express';

type AsyncFunction = (req, res, next) => Promise<void | any>

export default (func: AsyncFunction) => {
    return (req, res, next) => {
        func(req, res, next);
    }
} 