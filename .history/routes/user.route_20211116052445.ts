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

    router.get('/users', getAllUsers);

    router.get('/users/:id', getUser);

    userRouter.patch('/users/:id', updateUser); 

    userRouter.delete('/users/:id', deleteUser); 

    return userRouter; 
}   

export default userRouter;