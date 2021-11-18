import express, { Request, Response, NextFunction } from 'express'

import {
    createPoser,
    updatePoser,
    getPoserById,
    getAllPosers,
    deletePoser
} from '../controllers/poser.controller'

const poserRouter = express.Router();

poserRouter.use(function (req: Request, res: Response, next: NextFunction) {
    
});

poserRouter.post('/', createPoser);

poserRouter.get('/', getAllPosers);

poserRouter.get('/:id', getPoserById);

poserRouter.patch('/:id', updatePoser);

poserRouter.delete('/:id', deletePoser); 

poserRouter.use(function(req, res, next) {    
    res.status(201).json({ 
        saved: res.locals.saved, 
        data: {
            ...res.locals.created 
        }
    });
});

export default poserRouter; 