import { Request, Response, NextFunction } from 'express'

export default (req: Request, res: Response, next: NextFunction) => {
    express.static(path.join(__dirname, "public"), { 
        maxAge: 31557600000 
    })
}