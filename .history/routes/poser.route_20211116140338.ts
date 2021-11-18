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

poserRouter.get('/',  );

poserRouter.get('/:id', );

poserRouter.patch('/:id', );

poserRouter.delete('/:id', ); 

export default poserRouter; 