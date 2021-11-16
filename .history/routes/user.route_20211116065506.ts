import express from 'express'

import {
    getUserById,
    getAllUsers,
    createUser,
    deleteUser,
    updateUser
} from '../controllers/user.controller'

const userRouter = express.Router();

userRouter.post('/roles', createRole);

userRouter.put('/roles/:id', updateRole); 

userRouter.get('/roles', getAllRoles);  

userRouter.get('/roles/:id', getRole);

userRouter.delete('/roles/:id', deleteRole); 

export default userRouter; 
