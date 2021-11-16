import { Router } from 'express'

import {
    getUserById,
    getAllUsers,
    createUser,
    deleteUser,
    updateUser
} from '../controllers/user.controller'

const userRouter = () => {
    const userRouter = Router(); 

    userRouter.post('/users', createUser);

    userRouter.get('/users', getAllUsers); 

    userRouter.patch('/users/:id', updateUser); 

    userRouter.get('/users/:id', getUserById);

    userRouter.delete('/users/:id', deleteUser); 

    return userRouter; 
}   

export default userRouter;