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

    roleRouter.put('/roles/:id', ); 

    roleRouter.get('/roles', ); 

    roleRouter.get('/roles/:id', );

    roleRouter.delete('/roles/:id', ); 

    return roleRouter; 
}   

export default roleRoutes;