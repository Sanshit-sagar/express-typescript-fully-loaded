import { NextFunction } from "express";


export default (req: Request, res: Response, next: NextFunction) => {
    return cors(configuration)(req, res, next);
}