import { Request, Response, NextFunction } from 'express'
import logger from '../lib/logger'

import { 
    PoserInput, 
    PoserModel 
} from '../models/poser.model'

import newPoser from '../lib/faker/newPoser'

/**
 * POST /api/posers
 */
 const createPoser = async (_req: Request, res: Response, next: NextFunction) => {
    const poser: PoserInput = newPoser();

    try {
        const createdPoser = await PoserModel.create(poser);
        res.status(201).json({ data: createdPoser });
    } catch (error) {
        logger.info(`Encountered an error: ${error.message}`);
        logger.error(error);
        next(error); 
    }
}

/**
 * GET /api/posers
 * @query limit def = 10
 * @query sort
 */
const getAllPosers = async (req: Request, res: Response, next: NextFunction) => {
    const { 
        limit = 10, 
        sort = '+email'
    } = req.query; 

    const allPosers = await PoserModel
            .find()
            .limit(Number(parseInt(String(limit))))
            .sort(sort)
            .exec();
        
    res.status(200).json({ data: allPosers })
}


/**
 * GET /api/posers/:id
 * @param id
 */
const getPoserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params

        const poser = await PoserModel.findOne({ _id: id });

        if(!poser) {
            throw new Error(`Cannot find poser with id: ${id}`); 
        } else {
            res.status(200).json({ data: poser })
        }
    } catch (error) {
        logger.error(error);
        next(error); 
    }
}

/**
 * PATCH /api/posers/:id 
 * @param id
 * @body firstName, lastName, userName, email, avatar, phoneNumber, gender
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
 * @param id
 * TODO: Check if user exists / confirm delete operation was successful 
 */
const deletePoser = async (req: Request, res: Response) => {
    const { id } = req.params;

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