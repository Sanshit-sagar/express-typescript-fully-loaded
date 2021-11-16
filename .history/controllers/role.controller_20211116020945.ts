import { Request, Response, NextFunction } from 'express'


const createRole = async (req: Request, res: Response) => {
    
    const { description, name } = req.body; 

    if(!name || !description) {
        res.status(422).json({
            message: 'The fields name and description are required',
        });
    }

    const roleInput: RoleInput = {
        name,
        description
    }; 

    
}