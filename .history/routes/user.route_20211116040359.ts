import { Router } from 'express'

import {
    getUserById,
    getAllUsers,
    createRole,
    deleteUsers,
    update
} from '../controllers/role.controller'

const roleRoutes = () => {
    const roleRouter = Router(); 

    roleRouter.post('/roles', createRole);

    roleRouter.put('/roles/:id', updateRole); 

    roleRouter.get('/roles', getAllRoles); 

    roleRouter.get('/roles/:id', getRole);

    roleRouter.delete('/roles/:id', deleteRole); 

    return roleRouter; 
}   

export default roleRoutes;