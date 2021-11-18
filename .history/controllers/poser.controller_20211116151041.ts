import { Request, Response, NextFunction } from 'express'
import logger from '../lib/logger'
import { PoserInput, PoserModel } from '../models/poser.model'
import { createUser } from '../lib/faker/user'

/**
 * POST /api/posers
 */
 const createPoser = async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, userName, email, avatar } = createUser(); 
    // req.body; 
    // if(!firstName || !lastName || !userName || !email) {
    //     res.status(422).json({ message: 'The fields firstName, lastName, userName and email are required' });
    // }

    const poserInput: PoserInput = {
        firstName, 
        lastName, 
        userName, 
        email, 
        avatar
    }; 

    logger.info(`Attempting to create: ${JSON.stringify(poserInput)}`);

    const createdPoser = await PoserModel.create(poserInput, function(err, poserInput) {
        if(err) {
            next(err); 
        } else {
            res.locals = { ...res.locals, error: null, saved: true, data: createdPoser }
            next(); 
        }
    });
}

/**
 * GET /api/posers
 */
const getAllPosers = async (req: Request, res: Response) => {
    const allPosers = await PoserModel.find().sort('-email').exec(); 

    res.status(200).json({ data: allPosers });
}


/**
 * GET /api/posers/:id
 */
const getPoserById = async (req: Request, res: Response) => {
    const { id } = req.query

    const poser = await PoserModel.findOne({ _id: id }); 

    if(!poser) {
        res.status(404).json({  message: `Poser with id: ${id} not found.` })
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