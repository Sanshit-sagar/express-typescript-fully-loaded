import { Router, Request, Response } from 'express'


const roleRouter = () => {
    const router = Router(); 

    router.post('/roles', (req: Request, res: Response) => {

    });

    router.put('/roles/:id', (req: Request, res: Response) => {

    }); 

    router.get('/roles', (req: Request, res: Response) => {

    }); 

    router.get('/roles/:id', (req: Request, res: Response) => {

    });

    router.delete('/roles/:id', (req: Request, res: Response) => {

    }); 

    return router; 
}   

export default roleRouter;