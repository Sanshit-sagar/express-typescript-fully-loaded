import express from 'express'

import {
    getUserById,
    getAllUsers,
    createUser,
    deleteUser,
    updateUser
} from '../controllers/user.controller'

const userRouter = express.Router();

userRouter.post('/roles', createUser);

userRouter.put('/roles/:id', updateUser); 

userRouter.get('/roles', getAllUsers);  

userRouter.get('/roles/:id', getRole);

userRouter.delete('/roles/:id', deleteRole); 

export default userRouter; 
