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

userRouter.put('/roles/:id', updateUser); 

userRouter.get('/roles', getAllUsers);  

userRouter.get('/roles/:id', getUserById);

userRouter.delete('/roles/:id', deleteUser); 

export default userRouter; 
