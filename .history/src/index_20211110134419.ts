import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv'; 

dotenv.config(); 

const PORT = process.env.PORT || 3000; 
const app: Express = express();

app.get('/*', (req: Request, res: Response) => {
    res.status(200).send({ message: 'Hello from v0.0.4' }); 
});

app.listen(PORT, () => console.log(`Running on port ${PORT} ⚡`)); 
