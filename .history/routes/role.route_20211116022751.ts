import { Router } from 'express'

import {
    
}


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