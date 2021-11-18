import { Request, Response } from 'express'
import { PoserInput, PoserModel, Poser } from '../models/poser.model'

/**
 * POST /api/posers
 */
 const createRole = async (req: Request, res: Response) => {
    const { firstName, lastName, userName, email, avatar } = req.body; 

    if(!name || !description) {
        res.status(422).json({ message: 'The fields name and description are required' });
    }

    const roleInput: PoserInput = {
        firstName, 
        lastName, 
        userName, 
        email, avatar
    }; 

    const roleCreated = PoserModel.create(roleInput); 

    res.status(201).json(roleCreated)
}

/**
 * GET /api/posers
 */
const getAllRoles = async (req: Request, res: Response) => {
    const allRoles = await PoserModel.find().sort('-createdAt').exec(); 

    res.status(200).json({ data: allRoles });
}


/**
 * GET /api/posers/:id
 */
const getRole = async (req: Request, res: Response) => {
    const { id } = req.query

    const role = await PoserModel.findOne({ _id: id }); 

    if(!role) {
        res.status(404).json({  message: `Role with id: ${id} not found.` })
    }

    res.status(200).json({ data: role });
}

/**
 * PATCH /api/posers/:id 
 */
const updateRole = async (req: Request, res: Response) => {
    const { id } = req.query;
    const { name, description } = req.body;

    const role = await PoserModel.findOne({ _id: id });

    if(!role) {
        res.status(404).json({ message: `Role with id: ${id} not found.`});
    }

    if(!name || !description) {
        res.status(422).json({ message: `The fields name and description are required` });
    }

    await PoserModel.updateOne({ _id: id }, { name, description }); 

    const roleUpdated = await PoserModel.findById(id, { name, description }); 

    return res.status(200).json({ data: roleUpdated });
}


/**
 * DELETE /api/posers/:id 
 */
const deleteRole = async (req: Request, res: Response) => {
    const { id } = req.query;

    await PoserModel.findByIdAndDelete(id); 

    return res.status(200).json({ message: `Deleted Role with id: ${id} successfully.` });
}
