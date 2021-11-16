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

userRouter.get('/roles/:id', getRole);

userRouter.delete('/roles/:id', deleteRole); 

export default userRouter; 