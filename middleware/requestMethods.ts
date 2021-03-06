import { Request, Response, NextFunction } from 'express'; 

export default (req: Request, res: Response, next: NextFunction) => {
    const allowedMethods = [
        "OPTIONS",
        "HEAD",
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE"
    ];

    const allowedMethodsStr = allowedMethods.map((am) => `${am}, `); 

    if(!allowedMethods.includes(req.method)) {
        res.status(405).json({ 
            error: `Invalid method`,
            method: req.method,
            path: req.path,
            allowedMethods: allowedMethodsStr
        });
    }

    next(); 
}