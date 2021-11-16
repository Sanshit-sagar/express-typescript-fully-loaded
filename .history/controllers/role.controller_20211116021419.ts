import { Request, Response } from 'express'
import { Role, RoleInput } from '../models/role.model' 

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

    const roleCreated = Role.create(roleInput); 

    res.status(201).json(roleCreated)
}

const getAllRoles = async (req: Request, res: Response) => {

    const allRoles = await Role.find().sort('-createdAt').exec(); 

    res.status(200).json({ data: allRoles });
}

cos

export { 
    createRole, 
    getAllRoles 
};