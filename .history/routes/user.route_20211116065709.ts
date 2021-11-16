import express from 'express'

import {
    getUserById,
    getAllUsers,
    createUser,
    deleteUser,
    updateUser
} from '../controllers/user.controller'

const userRouter = express.Router();

userRouter.post('/', createUser);

userRouter.put('/:id', updateUser); 

userRouter.get('/', getAllUsers);  

userRouter.get('/:id', getUserById);

userRouter.delete('/roles/:id', deleteUser); 

export default userRouter; 
