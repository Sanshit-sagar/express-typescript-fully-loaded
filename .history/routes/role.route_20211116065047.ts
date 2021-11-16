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

    router.put('/roles/:id', updateRole); 

    router.get('/roles', getAllRoles); 

    router.get('/roles/:id', getRole);

    router.delete('/roles/:id', deleteRole); 

    return router; 
}   