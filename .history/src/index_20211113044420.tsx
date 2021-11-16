import express, { Express } from 'express';

import dotenv from 'dotenv';

import api from '../api/index'; 
import jobs from '../api/jobs';
import middleware from "../middleware"; 
import websockets from '../websockets';

import logger from "../lib/logger";
import startup from "../lib/startup";

startup()
    .then(() => {
        dotenv.config();

        const app: Express = express();   
        const port = process.env.PORT || 3000; 
      
        middleware(app); 
        api(app); 
        jobs(app); 

        app.listen(port, () => {
            if(process.send) {
                process.send(`Process running at http://localhost:${port}\n\n ⚡`); 
            }
        });

        websockets(app);

        process.on("message", (message: string) => {
            logger.info(`Recieved message: ${message}`);
        });
    })
    .catch((error: Error) => {
        logger.error(error);
    });