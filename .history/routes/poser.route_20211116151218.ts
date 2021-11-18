import express from 'express'

import {
    createPoser,
    updatePoser,
    getPoserById,
    getAllPosers,
    deletePoser
} from '../controllers/poser.controller'

const poserRouter = express.Router();

poserRouter.post('/', createPoser);

poserRouter.get('/', getAllPosers);

poserRouter.get('/:id', getPoserById);

poserRouter.patch('/:id', updatePoser);

poserRouter.delete('/:id', deletePoser); 

poserRouter.use(function(req, res, next) {    
    res.status(200).json({ 
        saved: res.locals.saved, 
        ...res.locals.data 
    });
});

export default poserRouter; 