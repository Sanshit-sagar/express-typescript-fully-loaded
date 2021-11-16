import { Router } from 'express'

import {
    getUserById,
    getAllUsers,
    createUsers,
    deleteUsers,
    updateUsers
} from '../controllers/role.controller'

const roleRoutes = () => {
    const userRouter = Router(); 

    userRouter.post('/roles', createUser);

    userRouter.put('/roles/:id', updateUser); 

    roleRouter.get('/roles', getAllUsers); 

    roleRouter.get('/roles/:id', getUserById);

    roleRouter.delete('/roles/:id', deleteUser); 

    return roleRouter; 
}   

export default roleRoutes;