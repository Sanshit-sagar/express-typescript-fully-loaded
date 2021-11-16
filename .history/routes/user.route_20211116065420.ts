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

    userRouter.get('/users/byId/:id', getUserById);

    userRouter.patch('/users/:id', updateUser); 

    userRouter.delete('/users/:id', deleteUser); 

    return userRouter; 
}   

export default userRouter;


const userRouter = express.Router();

userRouter.post('/roles', createRole);

userRouter.put('/roles/:id', updateRole); 

userRouter.get('/roles', getAllRoles);  

userRouter.get('/roles/:id', getRole);

userRouter.delete('/roles/:id', deleteRole); 

export default userRouter; 