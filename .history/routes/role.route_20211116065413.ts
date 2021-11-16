import express from 'express'

import {
    getRole,
    getAllRoles,
    createRole,
    deleteRole,
    updateRole
} from '../controllers/role.controller'

const role = express.Router();

userRouter.post('/roles', createRole);

userRouter.put('/roles/:id', updateRole); 

userRouter.get('/roles', getAllRoles);  

userRouter.get('/roles/:id', getRole);

userRouter.delete('/roles/:id', deleteRole); 

export default userRouter; 