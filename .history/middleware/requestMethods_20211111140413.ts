import { Request, Response, NextFunction } from 'express'; 


export default (req: Request, res: Response, next: NextFunction) => {
    const allowedMethods = [
        "OPTIONS",
        "CONNECT",
        "HEAD",
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE"
    ];

    if(!allowedMethods.includes(req.method)) {
        res.status(405).json({ 
            error: `Invalid method`,
            method: req.method,
            path: req.path,
            allowedMethods: allowedMethods.map((am) => `${am}, `)
        });
    }

    next(); 
}