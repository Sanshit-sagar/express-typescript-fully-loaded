import express, { Express, Request, Response } from 'express';

import cors from "./cors";
import helmet from 'helmet';
import bodyParser from "./bodyParser";
import compression from "compression";
import cookieParser from "cookie-parser";
import requestMethods from "../middleware/requestMethods"
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app: Express = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
    res.status(200).send({ message: 'Hello from v0.0.5' }); 
});

app.listen(PORT, () => console.log(`Running on port ${PORT} ⚡`)); 
