import { Request, Response, NextFunction } from 'express'
import logger from '../lib/logger'

import { 
    Poser,
    PoserInput, 
    PoserModel 
} from '../models/poser.model'

import newPoser from '../lib/faker/newPoser'

/**
 * POST /api/posers
 */
 const createPoser = async (req: Request, res: Response, next: NextFunction) => {
   
    const poser: PoserInput = newPoser();

    console.log(`Attempting to save: ${poser}`); 

    await PoserModel.create(poser, function(err, poserInput) {
        res.locals = { 
            ...res.locals, 
            error: err || null,
            output: err ? null : poser
        };

        if(err) {  next(err);  } 
        else {
            next(); 
        }
    });
}

/**
 * GET /api/posers
 */
const getAllPosers = async (req: Request, res: Response, next: NextFunction) => {
    const allPosers = await PoserModel.find().sort('-email').exec(); 
    res.locals = { ...res.locals, output: allPosers }   
    next(); 
}


/**
 * GET /api/posers/:id
 */
const getPoserById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.query

    const poser = await PoserModel.findOne({ _id: id });

    if(!poser) {
        res.status(404).json({  message: `Poser with id: ${id} not found.` })
    }

    res.locals = { ...res.locals, output: poser };
    next();
}

/**
 * PATCH /api/posers/:id 
 */
const updatePoser = async (req: Request, res: Response, next: NextFunction) => {
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

    res.locals = { ...res.locals, output: poserUpdated };
    next();
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