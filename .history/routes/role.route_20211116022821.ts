import { Router } from 'express'

import {
    getRole,
    getAllRoles,
    createRole,
    deleteRole,
    updateRole
} from '../'


const roleRoutes = () => {
    const roleRouter = Router(); 

    roleRouter.post('/roles', );

    roleRouter.put('/roles/:id', ); 

    roleRouter.get('/roles', ); 

    roleRouter.get('/roles/:id', );

    roleRouter.delete('/roles/:id', ); 

    return roleRouter; 
}   

export default roleRoutes;