import { Router, Request, Response } from 'express'


const roleRoutes = () => {
    const router = Router(); 

    router.post('/roles', (req: Request, res: Response) => {

    });

    router.put('/roles/:id', (req: Request, res: Response) => {

    }); 

    router.get('/roles', (req: Request, res: Response) => {

    }); 

    router.get('/roles/:id', (req: Request, res: Response) => {

    });

    roleRouter.delete('/roles/:id', (req: Request, res: Response) => {

    }); 

    return roleRouter; 
}   

export default roleRoutes;