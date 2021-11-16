import { Router } from 'express'


const roleRoutes = () => {
    const roleRouter = Router(); 

    roleRouter.post('/roles', );

    roleRouter.put('/roles/:id', ); 

    roleRouter.get('/roles', (req: Request, res: Response) => {

    }); 

    roleRouter.get('/roles/:id', (req: Request, res: Response) => {

    });

    roleRouter.delete('/roles/:id', (req: Request, res: Response) => {

    }); 

    return roleRouter; 
}   

export default roleRoutes;