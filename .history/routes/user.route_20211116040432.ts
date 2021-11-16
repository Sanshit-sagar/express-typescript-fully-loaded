import { Router } from 'express'

import {
    getUserById,
    getAllUsers,
    createUsers,
    deleteUsers,
    updateUsers
} from '../controllers/role.controller'

const roleRoutes = () => {
    const roleRouter = Router(); 

    roleRouter.post('/roles', createRole);

    roleRouter.put('/roles/:id', updateRole); 

    roleRouter.get('/roles', getAllRoles); 

    roleRouter.get('/roles/:id', getUserById);

    roleRouter.delete('/roles/:id', deleteRole); 

    return roleRouter; 
}   

export default roleRoutes;