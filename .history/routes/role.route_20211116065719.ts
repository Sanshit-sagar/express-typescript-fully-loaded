import express from 'express'

import {
    getRole,
    getAllRoles,
    createRole,
    deleteRole,
    updateRole
} from '../controllers/role.controller'

const roleRouter = express.Router();

roleRouter.post('/roles', createRole);

roleRouter.put('/roles/:id', updateRole); 

roleRouter.get('/roles', getAllRoles);  

roleRouter.get('/roles/:id', getRole);

roleRouter.delete('/:id', deleteRole); 

export default roleRouter; 