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
    logger.info(`Attempting to save: ${JSON.stringify(poser)}`); 

    await PoserModel.create(poser, function(err, _poserInput) {
        res.locals = { 
            ...res.locals, 
            error: err || null,
            output: err ? null : poser
        };

        if(err) {
            logger.info(`Encountered an error: ${err.message}`);
            logger.error(err);
            next(err); 
        } else {
            logger.info(`Successfully saved poser`)
            next(); 
        }
    });
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
    const { id } = req.params

    const poser = await PoserModel.findOne({ _id: id });

    if(!poser) {
        res.status(404).json({ message: `Poser with id: ${id} not found.` })
    } else {
        res.status(200).json({ data: poser })
    }
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