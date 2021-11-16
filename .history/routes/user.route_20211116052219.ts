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

    userRouter.get('/users/:id', getUserById);

    userRouter.patch('/users/:id', updateUser); 

    userRouter.delete('/users/:id', deleteUser); 

    return userRouter; 
}   

export default userRouter;