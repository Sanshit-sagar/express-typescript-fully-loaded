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

const getRole = async (req: Request, res: Response) => {
    const { id } = req.params

    const role = await Role.findOne({ _id: id }); 

    if(!role) {
        res.status(404).json({
            status: 404,
            message: `Role with id: ${id} not found.`,
            name: 'RESOURC'
        })
    }
}

export { 
    createRole, 
    getAllRoles 
};