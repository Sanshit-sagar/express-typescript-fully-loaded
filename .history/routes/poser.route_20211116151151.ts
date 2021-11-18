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
    const isSaved = res.locals.saved;
    
    res.status(200).json({ saved: isSaved, ...res.locals.user });
});

export default poserRouter; 