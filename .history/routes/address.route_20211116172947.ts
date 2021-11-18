import express from 'express'

import {
    createAddress,
    updateAddress,
    getAddress,
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
    res.status(201).json({ 
        saved: res.locals.saved, 
        data: {
            ...res.locals.created 
        }
    });
});

export default poserRouter; 