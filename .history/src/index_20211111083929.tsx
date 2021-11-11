import express, { Express, Request, Response } from 'express';

import dotenv from 'dotenv';
import helmet from 'helmet';
import bodyParser from "../middleware/bodyParser";
import requestMethods from "../middleware/requestMethods";

import logger from '../lib/logger'
import startup from '../lib/startup'
import websockets from '../websockets/index.js'

import { Server } from 'http';

startup()
    .then(() => {
        dotenv.config();

        const app: Express = express();   
        const port = process.env.PORT || 3000; 
      
        app.use(helmet());
        app.use(bodyParser);
        app.use(requestMethods);

        app.get('/api/route1', (req, res) => {
            res.status(200).json({
                
            })
        });

        const server: Server = app.listen(port, () => {
            if(process.send) {
                process.send(`Process running at http://localhost:${port}\n\n ⚡`); 
            }
        });

        websockets(server); 

        process.on("message", (message) => {
            console.log(message); 
        });
    })
    .catch((error: Error) => {
        logger.error(error);
    });


// app.get('/', (req: Request, res: Response) => {
//     res.status(200).send({ message: 'Hello from v0.0.5' }); 
// });

// app.listen(PORT, () => console.log(`Running on port ${PORT} ⚡`)); 
