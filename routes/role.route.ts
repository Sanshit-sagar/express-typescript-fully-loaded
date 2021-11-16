import express from 'express'

import {
    getRole,
    getAllRoles,
    createRole,
    deleteRole,
    updateRole
} from '../controllers/role.controller'

const roleRouter = express.Router();

roleRouter.post('/', createRole);

roleRouter.put('/:id', updateRole); 

roleRouter.get('/', getAllRoles);  

roleRouter.get('/:id', getRole);

roleRouter.delete('/:id', deleteRole); 

export default roleRouter; 