import { Request, Response } from 'express'
import { PoserInput, PoserModel } from '../models/poser.model'

/**
 * POST /api/posers
 */
 const createPoser = async (req: Request, res: Response) => {
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
const getAllPosers = async (req: Request, res: Response) => {
    const allPosers = await PoserModel.find().sort('-createdAt').exec(); 

    res.status(200).json({ data: allPosers });
}


/**
 * GET /api/posers/:id
 */
const getPoserById = async (req: Request, res: Response) => {
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
const updatePoser = async (req: Request, res: Response) => {
    const { id } = req.query;
    const { firstName, lastName, userName, email, avatar } = req.body;

    const poser = await PoserModel.findOne({ _id: id });

    if(!poser) {
        res.status(404).json({ message: `Poser with id: ${id} not found.`});
    }

    if(!firstName || !lastName || !userName || !email) {
        res.status(422).json({ message: `The fields firstName, lastName, userName and email are required` });
    }

    await PoserModel.updateOne({ _id: id }, { firstName, lastName, userName }); 

    const poserUpdated = await PoserModel.findById(id, { firstName, lastName, userName }); 

    return res.status(200).json({ data: poserUpdated });
}


/**
 * DELETE /api/posers/:id 
 */
const deletePoser = async (req: Request, res: Response) => {
    const { id } = req.query;

    await PoserModel.findByIdAndDelete(id); 

    return res.status(200).json({ message: `Deleted Poser with id: ${id} successfully.` });
}

export {
    createPoser,   
    updatePoser,
    deletePoser,
    getPoserById,
    getAllPosers
}; 