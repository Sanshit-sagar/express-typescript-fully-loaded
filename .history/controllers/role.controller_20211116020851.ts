import { Request, Response, NextFunction } from 'express'


const createRole = async (req: Request, res: Response) => {
    
    const { description, name } = body; 

    if(!name || !description) {
        res.status(422).json({
            
        })
    }
}