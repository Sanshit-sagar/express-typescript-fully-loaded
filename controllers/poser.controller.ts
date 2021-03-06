import { Request, Response, NextFunction } from 'express'

import { 
    PoserInput, 
    PoserModel 
} from '../models/poser.model'

import catchAsync from '../lib/catchAsync'
import newPoser from '../lib/faker/newPoser'

/**
 * POST /api/posers
 */
 const createPoser = catchAsync(async (_req: Request, res: Response, next: NextFunction) => {
    const poser: PoserInput = newPoser();
    const createdPoser = await PoserModel.create(poser);
    return res.status(201).json({ data: createdPoser });
}); 

/**
 * GET /api/posers
 * @query limit def = 10
 * @query sort
 */
const getAllPosers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { 
        limit = 10, 
        sort = '+email'
    } = req.query; 

    const count = Number(parseInt(String(limit)))
    const posers = await PoserModel.find().limit(count).sort(sort).exec();
    return res.status(200).json({ posers })
});


/**
 * GET /api/posers/:id
 * @param id
 */
const getPoserById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params

    const poser = await PoserModel.findOne({ _id: id });

    if(!poser) {
        throw new Error(`Cannot find poser with id: ${id}`); 
    } else {
        return res.status(200).json({ poser })
    }
}); 

/**
 * PATCH /api/posers/:id 
 * @param id
 * @body firstName, lastName, userName, email, avatar, phoneNumber, gender
 */
const updatePoser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.query;
    const { firstName, lastName, userName, email, avatar } = req.body;

    const poser = await PoserModel.findOne({ _id: id });

    if(!poser) {
        return res.status(404).json({ message: `Poser with id: ${id} not found.`});
    }

    if(!firstName || !lastName || !userName || !email) {
        return res.status(422).json({ message: `The fields firstName, lastName, userName and email are required` });
    }

    await PoserModel.updateOne({ _id: id }, { firstName, lastName, userName }); 
    const updatedPoser = await PoserModel.findById(id, { firstName, lastName, userName }); 
    
    return res.status(202).json({ updatedPoser })
});


/**
 * DELETE /api/posers/:id 
 * @param id
 * TODO: Check if user exists / confirm delete operation was successful 
 */
const deletePoser = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    await PoserModel.findByIdAndDelete(id); 

    return res.status(200).json({ message: `Deleted Poser with id: ${id} successfully.` });
}); 

export {
    createPoser,   
    updatePoser,
    deletePoser,
    getPoserById,
    getAllPosers
}; 