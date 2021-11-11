import bodyParser from 'body-parser';
import { Request, Response, NextFunction } from 'express'; 

export default (req: Request, res: Response, next: NextFunction) => {
    const contentType = req.headers['content-type'];

    if(contentType && contentType === 'application/json') {
        return bodyParser.urlencoded({ extended: true })(req, res, next);
    }
    
    return bodyParser.json()(req, res, next); 
}