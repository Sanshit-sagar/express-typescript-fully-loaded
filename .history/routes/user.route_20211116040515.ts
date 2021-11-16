import { Router } from 'express'

import {
    getUserById,
    getAllUsers,
    createUser,
    deleteUser,
    updateUser
} from '../controllers/role.controller'

const roleRoutes = () => {
    const userRouter = Router(); 

    userRouter.post('/roles', createUser);

    userRouter.put('/roles/:id', updateUser); 

    userRouter.get('/roles', getAllUsers); 

    userRouter.get('/roles/:id', getUserById);

    userRouter.delete('/roles/:id', deleteUser); 

    return userRouter; 
}   

export default userRouter;