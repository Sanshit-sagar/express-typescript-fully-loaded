import express, { Express, Request, Response } from 'express';

import dotenv from 'dotenv';
import helmet from 'helmet';
import bodyParser from "../middleware/bodyParser";
import requestMethods from "../middleware/requestMethods";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app: Express = express();

app.use(requestMethods);
app.use(helmet());
app.use(bodyParser);

app.get('/', (req: Request, res: Response) => {
    res.status(200).send({ message: 'Hello from v0.0.5' }); 
});

app.listen(PORT, () => console.log(`Running on port ${PORT} ⚡`)); 
