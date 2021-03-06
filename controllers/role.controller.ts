import { Request, Response } from 'express'
import { Role, RoleInput } from '../models/role.model' 

/**
 * Create a new role 
 */
const createRole = async (req: Request, res: Response) => {
    const { description, name } = req.body; 

    if(!name || !description) {
        res.status(422).json({ message: 'The fields name and description are required' });
    }

    const roleInput: RoleInput = {
        name,
        description
    }; 

    const roleCreated = await Role.create(roleInput); 

    res.status(201).json(roleCreated)
}

/**
 * 
 */
const getAllRoles = async (req: Request, res: Response) => {
    const allRoles = await Role.find().sort('-createdAt').exec(); 

    res.status(200).json({ data: allRoles });
}

/**
 * 
 */
const getRole = async (req: Request, res: Response) => {
    const { id } = req.query

    const role = await Role.findOne({ _id: id }); 

    if(!role) {
        res.status(404).json({  
            message: `Role with id: ${id} not found.`
        })
    }

    res.status(200).json({ data: role });
}

/**
 * 
 */
const updateRole = async (req: Request, res: Response) => {
    const { id } = req.query;
    const { name, description } = req.body;

    const role = await Role.findOne({ _id: id });

    if(!role) {
        res.status(404).json({ 
            message: `Role with id: ${id} not found.`
        });
    }

    if(!name || !description) {
        res.status(422).json({ 
            message: `The fields name and description are required` 
        });
    }

    await Role.updateOne({ _id: id }, { name, description }); 
    const roleUpdated = await Role.findById(id, { name, description }); 

    return res.status(200).json({ data: roleUpdated });
}

/**
 * 
 */
const deleteRole = async (req: Request, res: Response) => {
    const { id } = req.query;

    await Role.findByIdAndDelete(id); 

    return res.status(200).json({ message: `Deleted Role with id: ${id} successfully.` });
}

export {  
    getRole,
    getAllRoles,
    createRole,
    updateRole,
    deleteRole
};