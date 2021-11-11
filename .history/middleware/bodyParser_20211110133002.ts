import { Request, Response, NextFunction } from 'express'; 

export default (req: Request, res: Response, next: NextFunction) => {
    const contentType = req.headers['content-type');


}