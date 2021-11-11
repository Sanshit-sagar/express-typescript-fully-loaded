import express, { Express, Request, Response, NextFunction } from 'express';

import helmet from 'helmet';
import compression from "compression";
import cookieParser from "cookie-parser";

import dotenv from 'dotenv'; 
import cors from "../middleware/cors";
import bodyParser from "../middleware/bodyParser";
import requestMethods from "../middleware/requestMethods"

dotenv.config(); 

const PORT = process.env.PORT || 3000; 
const app: Express = express();
app.use(requestMethods);
app.use(compression()); 
app.use(express.static("public")); 
app.use(cors);
app.use(helmet());
app.use(bodyParser);
app.use(cookieParser());

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send({ message: 'Hello from v0.0.4' }); 
});

app.listen(PORT, () => console.log(`Running on port ${PORT} ⚡`)); 
