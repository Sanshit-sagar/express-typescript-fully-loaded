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

    userRouter.put('/users/:id', updateUser); 

    userRouter.get('/users', getAllUsers); 

    userRouter.get('/roles/:id', getUserById);

    userRouter.delete('/roles/:id', deleteUser); 

    return userRouter; 
}   

export default userRouter;