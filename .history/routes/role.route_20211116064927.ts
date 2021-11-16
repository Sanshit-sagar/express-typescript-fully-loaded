import { Router } from 'express'

import {
    getRole,
    getAllRoles,
    createRole,
    deleteRole,
    updateRole
} from '../controllers/role.controller'

const roleRoutes = () => {
    const router = Router(); 

    router.post('/roles', createRole);

    roleRouter.put('/roles/:id', updateRole); 

    roleRouter.get('/roles', getAllRoles); 

    roleRouter.get('/roles/:id', getRole);

    roleRouter.delete('/roles/:id', deleteRole); 

    return roleRouter; 
}   

export default roleRoutes;