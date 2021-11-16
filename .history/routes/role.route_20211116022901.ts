import { Router } from 'express'

import {
    getRole,
    getAllRoles,
    createRole,
    deleteRole,
    updateRole
} from '../controllers/role.controller'


const roleRoutes = () => {
    const roleRouter = Router(); 

    roleRouter.post('/roles', createRole);

    roleRouter.put('/roles/:id', updateRole); 

    roleRouter.get('/roles', getAllRol); 

    roleRouter.get('/roles/:id', );

    roleRouter.delete('/roles/:id', ); 

    return roleRouter; 
}   

export default roleRoutes;