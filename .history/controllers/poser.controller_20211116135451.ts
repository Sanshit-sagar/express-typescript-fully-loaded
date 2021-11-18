import { Request, Response } from 'express'
import { PoserInput, PoserModel, Poser } from '../models/poser.model'

/**
 * POST /api/posers
 */
 const createRole = async (req: Request, res: Response) => {
    const { firstName, lastName, userName, email, avatar } = req.body; 

    if(!firstName || !lastName || !userName || !email) {
        res.status(422).json({ message: 'The fields name and description are required' });
    }

    const poserInput: PoserInput = {
        firstName, 
        lastName, 
        userName, 
        email, 
        avatar
    }; 

    const poserCreated = PoserModel.create(poserInput); 

    res.status(201).json(poserCreated)
}

/**
 * GET /api/posers
 */
const getAllRoles = async (req: Request, res: Response) => {
    const allPosers = await PoserModel.find().sort('-createdAt').exec(); 

    res.status(200).json({ data: allPosers });
}


/**
 * GET /api/posers/:id
 */
const getRole = async (req: Request, res: Response) => {
    const { id } = req.query

    const poser = await PoserModel.findOne({ _id: id }); 

    if(!poser) {
        res.status(404).json({  message: `Role with id: ${id} not found.` })
    }

    res.status(200).json({ data: poser });
}

/**
 * PATCH /api/posers/:id 
 */
const updateRole = async (req: Request, res: Response) => {
    const { id } = req.query;
    const { firstName, lastName, userName, email, avatar } = req.body;

    const poser = await PoserModel.findOne({ _id: id });

    if(!poser) {
        res.status(404).json({ message: `Role with id: ${id} not found.`});
    }

    if(!firstName || !lastName || !userName || !email) {
        res.status(422).json({ message: `The fields name and description are required` });
    }

    await PoserModel.updateOne({ _id: id }, { firstName, lastName, userName, email, avatar }); 

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
